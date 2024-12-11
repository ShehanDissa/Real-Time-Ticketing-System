package org.oop.realtimeticketingsystem.verndor;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.oop.realtimeticketingsystem.tickets.CommandHandler;
import org.oop.realtimeticketingsystem.tickets.TicketService;

@RequiredArgsConstructor
public class Vendor implements Runnable {

    private final int ticketReleaseRate;
    private final TicketService ticketService;
    private final CommandHandler commandHandler;
    private static final Logger logger = LogManager.getLogger(Vendor.class);

    @Override
    public void run() {
        while (commandHandler.isRunning()) {
            try {
                logger.info("Vendor running. Vendor ID: {}, Ticket Release Rate: {}",
                        Thread.currentThread().getId(), ticketReleaseRate);
                String response = ticketService.addTickets(ticketReleaseRate);

                logger.info("Server response: {}", response);

                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                logger.warn("Vendor thread was interrupted.", e);
                break;
            } catch (Exception e) {
                logger.error("Error while adding tickets: {}", e.getMessage(), e);
            }
        }
    }
}
