package org.oop.realtimeticketingsystem.tickets;

import lombok.extern.slf4j.Slf4j;
import org.oop.realtimeticketingsystem.purchase.Purchase;
import org.oop.realtimeticketingsystem.purchase.PurchaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@Slf4j
public class TicketPool {

    private final TicketRepository ticketRepository;
    private final PurchaseRepository purchaseRepository;

    @Autowired
    public TicketPool(TicketRepository ticketRepository, PurchaseRepository purchaseRepository) {
        this.ticketRepository = ticketRepository;
        this.purchaseRepository = purchaseRepository;
    }

    public synchronized void initialize(int totalTickets) {
        for (int i = 0; i < totalTickets; i++) {
            Ticket ticket = new Ticket();
            ticket.setStatus("AVAILABLE");
            ticketRepository.save(ticket); // Save ticket to database
        }
        log.info("Ticket pool initialized with {} tickets.", totalTickets);
    }

    public synchronized void addTickets(int count) {
        for (int i = 0; i < count; i++) {
            Ticket ticket = new Ticket();
            ticket.setStatus("AVAILABLE");
            ticketRepository.save(ticket); // Save ticket to database
        }
        log.info("Added {} tickets to the pool.", count);
    }

    public synchronized int getTicketCount() {
        return (int) ticketRepository.count();
    }

    public synchronized void removeTickets(int count, String customerId) {
        List<Ticket> availableTickets = ticketRepository.findByStatus("AVAILABLE");
        int ticketsRemoved = 0;

        for (int i = 0; i < count && i < availableTickets.size(); i++) {
            Ticket ticket = availableTickets.get(i);
            ticket.setStatus("PURCHASED");
            ticketRepository.save(ticket); // Update ticket status in the database

            // Save purchase action to DB
            Purchase purchase = new Purchase();
            purchase.setTicketId(ticket.getId());
            purchase.setCustomerId(customerId); // Using thread ID as customer ID
            purchaseRepository.save(purchase);

            ticketsRemoved++;
        }

        if (ticketsRemoved > 0) {
            log.info("Customer {} purchased {} tickets.", customerId, ticketsRemoved);
        }
    }
}
