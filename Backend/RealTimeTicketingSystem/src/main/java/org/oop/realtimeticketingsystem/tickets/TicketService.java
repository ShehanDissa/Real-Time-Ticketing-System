package org.oop.realtimeticketingsystem.tickets;

import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class TicketService {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);
    private final TicketPool ticketPool;
    private final TicketRepository ticketRepository;

    @Autowired
    public TicketService(TicketPool ticketPool, TicketRepository ticketRepository) {
        this.ticketPool = ticketPool;
        this.ticketRepository = ticketRepository;
    }

    public Integer getTicketCount() {
        return ticketPool.getTicketCount();
    }

    public Integer addTickets(Integer ticketsToAdd) {
        return ticketPool.addTickets(ticketsToAdd);
    }

    public Integer removeTickets(Integer ticketsToRemove, String customerId) {
        return ticketPool.removeTickets(ticketsToRemove, customerId);
    }

    public void initializeTicketPool(Configuration config) {
        log.info("Configuration loaded successfully with total tickets: {}, ticket release rate: {}, customer retrieval rate: {}, max ticket capacity: {}",
                config.getTotalTickets(), config.getTicketReleaseRate(), config.getCustomerRetrievalRate(), config.getMaxTicketCapacity());
        ticketPool.initialize(config);
    }

    @Transactional
    public List<Ticket> getAvailableTickets() {
        return ticketRepository.findByStatus("AVAILABLE");
    }

}
