package org.oop.realtimeticketingsystem.tickets;

import lombok.RequiredArgsConstructor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.oop.realtimeticketingsystem.customer.Customer;
import org.oop.realtimeticketingsystem.verndor.Vendor;

import java.util.Scanner;

@RequiredArgsConstructor
public class CommandHandler {

    private static final Logger logger = LogManager.getLogger(CommandHandler.class);
    private final Configuration config;
    private final TicketService ticketService;
    private volatile boolean isRunning;

    public void promptUser() {
        var scanner = new Scanner(System.in);

        while (true) {
            System.out.println("Press 1 to start, Press 2 to stop:");
            var choice = scanner.nextLine();

            switch (choice) {
                case "1" -> startApplication();
                case "2" -> stopApplication();
                default -> System.out.println("Invalid input. Please press 1 or 2.");
            }
        }
    }

    private void startApplication() {
        if (isRunning) {
            logger.info("Application is already running.");
            return;
        }

        System.out.println("Application has started.");
        isRunning = true;

        for (int i = 0; i < 5; i++) {
            Thread vendorThread = new Thread(new Vendor(config.getTicketReleaseRate(), ticketService, this));
            vendorThread.start();
            logger.info("Vendor {} started.", i);
        }

        for (int i = 0; i < 5; i++) {
            Thread customerThread = new Thread(new Customer(config.getCustomerRetrievalRate(), ticketService, this));
            customerThread.start();
            logger.info("Customer {} started.", i);
        }
    }

    private void stopApplication() {
        if (!isRunning) {
            logger.info("Application is not running.");
            return;
        }

        logger.info("Application is stopping...");
        isRunning = false;
    }

    public boolean isRunning() {
        return isRunning;
    }
}

