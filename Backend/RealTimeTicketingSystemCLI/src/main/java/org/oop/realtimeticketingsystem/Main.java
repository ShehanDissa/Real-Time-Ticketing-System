package org.oop.realtimeticketingsystem;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.oop.realtimeticketingsystem.applicationconfig.ConfigurationService;
import org.oop.realtimeticketingsystem.authentication.AuthenticationService;
import org.oop.realtimeticketingsystem.tickets.CommandHandler;
import org.oop.realtimeticketingsystem.tickets.TicketService;

import java.util.Scanner;

public class Main {

    private static final Scanner scanner = new Scanner(System.in);
    private static final Logger logger = LogManager.getLogger(Main.class);
    private static final ConfigurationService configurationService = new ConfigurationService();

    public static void main(String[] args) {
        System.out.println("-------------------------");
        System.out.println("Real-time Ticketing System");
        System.out.println("-------------------------");


        Configuration config = configurationService.loadOrInitializeConfiguration();
        logger.info("Configuration loaded successfully with total tickets: {}, ticket release rate: {}, customer retrieval rate: {}, max ticket capacity: {}",
                config.getTotalTickets(), config.getTicketReleaseRate(), config.getCustomerRetrievalRate(), config.getMaxTicketCapacity());

        try {
            AuthenticationService authenticationService = new AuthenticationService();
            authenticationService.authenticate();

            TicketService ticketService = new TicketService(config, authenticationService.getBarerToken());
            ticketService.initializeTicketPool();

            CommandHandler commandHandler = new CommandHandler(config, ticketService);
            commandHandler.promptUser();
        }
        catch (Exception e) {
            logger.error("Error occurred while running the application.");
            System.exit(1);
        }
    }

}