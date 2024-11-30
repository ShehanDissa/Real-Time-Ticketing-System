package org.oop.realtimeticketingsystem.tickets;

import org.oop.realtimeticketingsystem.applicationconfig.Configuration;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tickets")
@CrossOrigin
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping("/initialize")
    public ResponseEntity<String> initializeTicketPool(@RequestBody Configuration config) {
        try {
            ticketService.initializeTicketPool(config);
            return ResponseEntity.ok("Ticket pool initialized successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error initializing ticket pool: " + e.getMessage());
        }
    }

    @GetMapping("/count")
    public Integer getTicketCount() {
        return ticketService.getTicketCount();
    }

    @PostMapping("/add")
    public ResponseEntity<String> addTickets(@RequestBody Integer count) {
        try {
            Integer addedCount = ticketService.addTickets(count);
            return ResponseEntity.ok(addedCount + " tickets added successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error adding tickets. " + e.getMessage());

        }
    }

    @PostMapping("/remove")
    public ResponseEntity<String> removeTickets(@RequestBody RemoveTicketRequest request) {

        try {
            Integer removedTickets = ticketService.removeTickets(request.getCount(), request.getCustomerId());
            return ResponseEntity.ok("Customer " + request.getCustomerId() + " Purchased "+ removedTickets + " tickets Successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error purchasing tickets. " +e.getMessage());
        }
    }

    @GetMapping("/available")
    public ResponseEntity<?> getAvailableTickets() {
        try {
            return ResponseEntity.ok(ticketService.getAvailableTickets());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching available tickets. " + e.getMessage());
        }
    }




}
