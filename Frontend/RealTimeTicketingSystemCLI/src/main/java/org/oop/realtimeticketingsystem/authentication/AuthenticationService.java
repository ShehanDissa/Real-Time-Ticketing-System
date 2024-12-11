package org.oop.realtimeticketingsystem.authentication;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.Getter;
import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.oop.realtimeticketingsystem.tickets.TicketService;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.Scanner;

@Getter
public class AuthenticationService {

    private String barerToken;
    private final HttpClient httpClient;
    private final ObjectMapper objectMapper;
    private static final Logger logger = LogManager.getLogger(TicketService.class);

    public AuthenticationService() {
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }

    public void authenticate() {
        while (true) {
            try {
                var credentials = getUserCredentials();
                var tokenResponse = sendAuthenticationRequest(credentials);
                processAuthenticationResponse(tokenResponse);
                break; // Exit the loop if authentication is successful
            } catch (Exception e) {
                logger.error("Authentication failed: {}", e.getMessage());
                System.out.print("Would you like to try again? (yes/no): ");
                var scanner = new Scanner(System.in);
                var retry = scanner.nextLine().trim().toLowerCase();
                if (!(retry.equals("yes") || retry.equals("y"))) {
                    System.out.println("Exiting application.");
                    System.exit(0); // Terminate the application
                }
            }
        }
    }

    private Credentials getUserCredentials() {
        var scanner = new Scanner(System.in);
        System.out.print("Enter username: ");
        var username = scanner.nextLine();
        System.out.print("Enter password: ");
        var password = scanner.nextLine();
        return new Credentials(username, password);
    }

    private String sendAuthenticationRequest(Credentials credentials) throws Exception {
        var baseURL = System.getenv("BaseURL");
        if (baseURL == null || baseURL.isBlank()) {
            throw new IllegalStateException("BaseURL environment variable is not set");
        }

        var uri = URI.create(baseURL + "auth/login");
        var requestBody = objectMapper.writeValueAsString(credentials);

        var postRequest = HttpRequest.newBuilder()
                .uri(uri)
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(requestBody))
                .build();

        var response = httpClient.send(postRequest, HttpResponse.BodyHandlers.ofString());
        if (response.statusCode() == 200) {
            return response.body();
        } else {
            throw new IllegalStateException("Invalid credentials. Status code: " + response.statusCode());
        }
    }

    private void processAuthenticationResponse(String responseBody) throws Exception {
        var tokenResponse = objectMapper.readValue(responseBody, TokenResponse.class);

        if (!"Login Successful".equalsIgnoreCase(tokenResponse.getStatus())) {
            throw new IllegalStateException("Authentication failed: " + tokenResponse.getStatus());
        }
        barerToken = tokenResponse.getToken();
        System.out.println("Authentication successful! Token acquired.");
    }

    // Inner class for credentials
    private record Credentials(String userName, String password) {

    }

    // Inner class for token response
    @Getter
    @Setter
    private static class TokenResponse {
        private String userId;
        private String token;
        private String status;
    }
}

