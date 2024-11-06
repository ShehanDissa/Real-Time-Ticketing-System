package org.oop.realtimeticketingsystem;

import org.oop.realtimeticketingsystem.config.Configuration;
import org.oop.realtimeticketingsystem.config.ConfigurationService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class RealTimeTicketingSystemApplication implements CommandLineRunner {

    private static final Logger logger = LoggerFactory.getLogger(RealTimeTicketingSystemApplication.class);

    @Autowired
    private ConfigurationService configurationService;

    public static void main(String[] args) {
        SpringApplication.run(RealTimeTicketingSystemApplication.class, args);
    }

    @Override
    public void run(String... args) {
        Configuration config = configurationService.loadOrInitializeConfiguration();
        logger.info("Configuration Loaded: {}", config);
    }
}
