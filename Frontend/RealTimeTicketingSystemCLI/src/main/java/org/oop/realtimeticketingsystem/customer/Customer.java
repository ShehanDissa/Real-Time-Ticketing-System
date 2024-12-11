package org.oop.realtimeticketingsystem.customer;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.oop.realtimeticketingsystem.tickets.CommandHandler;
import org.oop.realtimeticketingsystem.tickets.TicketService;

@RequiredArgsConstructor
public class Customer implements Runnable {

    private final int customerRetrievalRate;
    private final TicketService ticketService;
    private final CommandHandler commandHandler;
    private static final Logger logger = LogManager.getLogger(Customer.class);

    @Override
    public void run() {
        while (commandHandler.isRunning()) {
            try {
                logger.info("Customer is running. Customer Id: {}, Retrieval Rate: {}", Thread.currentThread().getId(), customerRetrievalRate);


                String response = ticketService.removeTickets(customerRetrievalRate, String.valueOf(Thread.currentThread().getId()));

                logger.info("Server response: {}", response);

                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                logger.warn("Customer thread was interrupted.", e);
                break;
            } catch (Exception e) {
                logger.error("Error during ticket retrieval: {}", e.getMessage());
            }
        }
    }
}
