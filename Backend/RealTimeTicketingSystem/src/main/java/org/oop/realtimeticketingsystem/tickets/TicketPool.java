package org.oop.realtimeticketingsystem.tickets;

import jakarta.persistence.OptimisticLockException;
import lombok.extern.slf4j.Slf4j;
import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.oop.realtimeticketingsystem.purchase.Purchase;
import org.oop.realtimeticketingsystem.purchase.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Component
@Slf4j
public class TicketPool {

    private final TicketRepository ticketRepository;
    private final PurchaseRepository purchaseRepository;
    private Configuration config;

    @Autowired
    public TicketPool(TicketRepository ticketRepository, PurchaseRepository purchaseRepository) {
        this.ticketRepository = ticketRepository;
        this.purchaseRepository = purchaseRepository;
    }

    @Transactional
    public void initialize(Configuration config) {
        this.config = config;
        ticketRepository.deleteAll();
        purchaseRepository.deleteAll();
        for (int i = 0; i < config.getTotalTickets(); i++) {
            Ticket ticket = new Ticket();
            ticket.setStatus("AVAILABLE");
            ticketRepository.save(ticket);
        }
        log.info("Ticket pool initialized with {} tickets.", config.getTotalTickets());
    }

    @Transactional
    public synchronized Integer addTickets(int count) {
        long availableCount = ticketRepository.countByStatus("AVAILABLE");
        if (availableCount + count > config.getMaxTicketCapacity()) {
            count = (int) (config.getMaxTicketCapacity() - availableCount);
            log.warn("Cannot add all requested tickets. Adding only {} tickets due to capacity.", count);
        }
        if (count <= 0) {
            log.warn("Cannot add {} tickets to the pool. Ticket count must be greater than 0.", count);
            return 0;
        }

        for (int i = 0; i < count; i++) {
            Ticket ticket = new Ticket();
            ticket.setStatus("AVAILABLE");
            ticketRepository.save(ticket);
        }

        log.info("Added {} tickets to the pool.", count);
        return count;
    }


    @Transactional
    public int getTicketCount() {
        return (int) ticketRepository.countByStatus("AVAILABLE");
    }

    @Transactional
    public synchronized Integer removeTickets(int count, String customerId) {
        List<Ticket> availableTickets = ticketRepository.findByStatus("AVAILABLE");

        if (availableTickets.isEmpty()) {
            log.warn("No available tickets to remove. Customer {} cannot purchase any tickets.", customerId);
            throw new IllegalStateException("No available tickets to purchase.");
        }

        int ticketsRemoved = 0;

        for (int i = 0; i < count && i < availableTickets.size(); i++) {
            try {
                Ticket ticket = availableTickets.get(i);
                ticket.setStatus("PURCHASED");
                ticketRepository.save(ticket);

                Purchase purchase = new Purchase();
                purchase.setTicketId(ticket.getId());
                purchase.setCustomerId(customerId);
                purchaseRepository.save(purchase);

                ticketsRemoved++;
            } catch (OptimisticLockException e) {
                log.warn("Optimistic locking failed for ticket ID: {}. Retrying with the next ticket.", availableTickets.get(i).getId());
                continue;
            }
        }

        if (ticketsRemoved > 0) {
            log.info("Customer {} purchased {} tickets.", customerId, ticketsRemoved);
        } else {
            log.warn("Customer {} failed to purchase any tickets due to conflicts.", customerId);
        }

        return ticketsRemoved;
    }

}
