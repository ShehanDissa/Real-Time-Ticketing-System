package org.oop.realtimeticketingsystem.tickets;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.oop.realtimeticketingsystem.applicationconfig.Configuration;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class TicketService {
    private final Configuration config;
    private final String baseURL;
    private final String token;
    private static final Logger logger = LogManager.getLogger(TicketService.class);
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;

    public TicketService(Configuration config, String token) {
        this.config = config;
        this.token = token;
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
        this.baseURL = System.getenv("BaseURL");

        if (baseURL == null || baseURL.isBlank()) {
            throw new IllegalStateException("BaseURL environment variable is not set");
        }
        if (token == null || token.isBlank()) {
            throw new IllegalStateException("BearerToken is not set");
        }
    }

    public void initializeTicketPool() {
        try {
            var uri = URI.create(baseURL + "tickets/initialize");
            var requestBody = objectMapper.writeValueAsString(config);

            var postRequest = HttpRequest.newBuilder()
                    .uri(uri)
                    .header("Content-Type", "application/json")
                    .header("Authorization", "Bearer " + token)
                    .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                    .build();

            httpClient.sendAsync(postRequest, HttpResponse.BodyHandlers.ofString())
                    .thenApply(response -> {
                        logger.info("HTTP Response Status Code: {}", response.statusCode());
                        return response.body();
                    })
                    .thenAccept(body -> logger.info("Server Response: {}", body))
                    .join();
        } catch (Exception e) {
            logger.error("Error sending request to initialize ticket pool: {}", e.getMessage());
        }
    }

    public String addTickets(int count) throws Exception {

        var uri = URI.create(baseURL + "tickets/add");

        // Prepare JSON payload
        var requestBody = objectMapper.writeValueAsString(count);

        // Create HTTP POST request
        var postRequest = HttpRequest.newBuilder()
                .uri(uri)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        logger.debug("Sending request to add {} tickets", count);

        // Send HTTP request and handle response
        var response = httpClient.send(postRequest, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            logger.debug("Response received: {}", response.body());
            return response.body();
        } else {
            throw new IllegalStateException("Error adding tickets. Status: " + response.statusCode() +
                    ", Message: " + response.body());
        }
    }

    public String removeTickets(int count, String customerId) throws Exception {
        var uri = URI.create(baseURL + "tickets/remove");

        var requestBody = String.format("{\"count\":%d,\"customerId\":\"%s\"}", count, customerId);

        var postRequest = HttpRequest.newBuilder()
                .uri(uri)
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        logger.debug("Sending request to remove {} tickets", count);

        // Send HTTP request and handle response
        var response = httpClient.send(postRequest, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            logger.debug("Response received: {}", response.body());
            return response.body();
        } else {
            throw new IllegalStateException("Error removing tickets. Status: " + response.statusCode() +
                    ", Message: " + response.body());
        }
    }
}
