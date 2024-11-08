package org.oop.realtimeticketingsystem.applicationconfig;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.extern.log4j.Log4j2;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.Scanner;

@Log4j2
@Service
public class ConfigurationService {

    private static final Logger logger = LoggerFactory.getLogger(ConfigurationService.class);

    private final Scanner scanner = new Scanner(System.in);
    private final ObjectMapper objectMapper = new ObjectMapper();
    private final File configFile = new File("config.json");

    @Getter
    private Configuration configuration;

    public Configuration loadOrInitializeConfiguration() {
        if (configFile.exists()) {
            try {
                configuration = objectMapper.readValue(configFile, Configuration.class);
            } catch (IOException e) {
                logger.error("Failed to load existing configuration, starting new setup.", e);
            }
        }
        if (configuration == null) {
            configuration = initializeConfiguration();
        }
        return configuration;
    }

    private Configuration initializeConfiguration() {
        logger.info("Starting new configuration setup.");
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
                    logger.warn("Please enter a positive integer.");
                }
            } catch (NumberFormatException e) {
                logger.warn("Invalid input. Please enter a valid integer.", e);
            }
        }
    }
}
