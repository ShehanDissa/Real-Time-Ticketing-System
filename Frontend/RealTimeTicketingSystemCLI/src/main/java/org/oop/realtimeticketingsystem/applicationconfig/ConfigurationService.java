package org.oop.realtimeticketingsystem.applicationconfig;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

@Log4j2
public class ConfigurationService {

    private final Scanner scanner = new Scanner(System.in);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File configFile = new File("config.json");
    private static final Logger logger = LogManager.getLogger(ConfigurationService.class);

    @Getter
    private Configuration configuration;

    public Configuration loadOrInitializeConfiguration() {
        if (configFile.exists()) {
            System.out.print("Config exists. Do you want to load it? (yes/no): ");
            var response = scanner.nextLine().trim().toLowerCase();
            if ("yes".equals(response) || "y".equals(response)) {
                try {
                    configuration = objectMapper.readValue(configFile, Configuration.class);
                } catch (IOException e) {
                    System.out.println("Failed to load existing configuration, starting new setup.");
                    logger.debug("Failed to load existing configuration, starting new setup.", e);
                }
            }
        }
        if (configuration == null) {
            configuration = initializeConfiguration();
        }
        return configuration;
    }

    private Configuration initializeConfiguration() {
        System.out.println("Starting new configuration setup.");
        int totalTickets = promptForInt("Total Number of Tickets: ");
        int ticketReleaseRate = promptForInt("Ticket Release Rate: ");
        int customerRetrievalRate = promptForInt("Customer Retrieval Rate: ");
        int maxTicketCapacity = promptForInt("Maximum Ticket Capacity: ");

        configuration = new Configuration(totalTickets, ticketReleaseRate, customerRetrievalRate, maxTicketCapacity);

        try {
            objectMapper.writeValue(configFile, configuration);
            logger.info("Configuration saved successfully!");
        } catch (IOException e) {
            logger.error("Failed to save configuration.", e);
        }

        return configuration;
    }

    private int promptForInt(String message) {
        int value;
        while (true) {
            System.out.print(message);
            String input = scanner.nextLine();
            try {
                value = Integer.parseInt(input);
                if (value > 0) {
                    return value;
                } else {
                    System.out.println("Please enter a positive integer.");
                }
            } catch (NumberFormatException e) {
                System.out.println("Invalid input. Please enter a valid integer.");
                logger.debug("Invalid input. Please enter a valid integer.", e);
            }
        }
    }
}
