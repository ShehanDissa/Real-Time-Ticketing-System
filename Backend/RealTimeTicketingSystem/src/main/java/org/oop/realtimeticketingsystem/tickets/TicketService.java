package org.oop.realtimeticketingsystem.tickets;

import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.oop.realtimeticketingsystem.applicationconfig.ConfigurationService;
import org.oop.realtimeticketingsystem.vendor.Vendor;
import org.oop.realtimeticketingsystem.customer.Customer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class TicketService implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(TicketService.class);

    private final ConfigurationService configurationService;
    private final TicketPool ticketPool;

    @Autowired
    public TicketService(ConfigurationService configurationService, TicketPool ticketPool) {
        this.configurationService = configurationService;
        this.ticketPool = ticketPool;
    }

    @Override
    public void run(String... args) throws Exception {
        Configuration config = configurationService.loadOrInitializeConfiguration();
        log.info("Configuration loaded successfully with total tickets: {}, ticket release rate: {}, customer retrieval rate: {}, max ticket capacity: {}",
                config.getTotalTickets(), config.getTicketReleaseRate(), config.getCustomerRetrievalRate(), config.getMaxTicketCapacity());

        ticketPool.initialize(config.getTotalTickets());

        // Start vendor threads
        for (int i = 0; i < 5; i++) { // Simulate 5 vendors
            Thread vendorThread = new Thread(new Vendor(ticketPool, config.getTicketReleaseRate(), config.getMaxTicketCapacity()));
            vendorThread.start();
        }

        // Start customer threads
        for (int i = 0; i < 5; i++) { // Simulate 5 customers
            Thread customerThread = new Thread(new Customer(ticketPool, config.getCustomerRetrievalRate()));
            customerThread.start();
        }
    }

    public Integer getTicketCount() {
        return ticketPool.getTicketCount();
    }
}
