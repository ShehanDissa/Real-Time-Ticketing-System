package org.oop.realtimeticketingsystem.tickets;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.oop.realtimeticketingsystem.applicationconfig.ConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;


@Service
public class TicketService implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);
    private final ConfigurationService configurationService;
    private TicketPool ticketPool;

    @Autowired
    public TicketService(ConfigurationService configurationService) {
        this.configurationService = configurationService;
    }

    @Override
    public void run(String... args) throws Exception {
        Configuration config = configurationService.loadOrInitializeConfiguration();
        log.info("Configuration loaded successfully with total tickets: {}, ticket release rate: {}, customer retrieval rate: {}, max ticket capacity: {}", config.getTotalTickets(), config.getTicketReleaseRate(), config.getCustomerRetrievalRate(), config.getMaxTicketCapacity());


        this.ticketPool = new TicketPool(config.getTotalTickets());
        log.info("TicketPool created successfully with total tickets: {}", ticketPool.getTicketCount());
    }

    public Integer getTicketCount() {
        return ticketPool.getTicketCount();
    }
}
