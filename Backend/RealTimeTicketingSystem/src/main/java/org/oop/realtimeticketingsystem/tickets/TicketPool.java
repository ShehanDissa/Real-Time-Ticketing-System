package org.oop.realtimeticketingsystem.tickets;

import lombok.Getter;
import lombok.Setter;

import java.util.Collections;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
public class TicketPool {

    private final List<Ticket> tickets;

    public TicketPool(int totalTickets) {
        tickets = Collections.synchronizedList(new ArrayList<>());
        for (int i = 0; i < totalTickets; i++) {
            tickets.add(new Ticket(i + 1));
        }
    }

    public synchronized void addTickets(int count) {
        for (int i = 0; i < count; i++) {
            tickets.add(new Ticket(tickets.size() + 1));
        }
    }

    public synchronized Ticket removeTicket() {
        if (!tickets.isEmpty()) {
            return tickets.remove(tickets.size() - 1);
        }
        return null;
    }

    public synchronized int getTicketCount() {
        return tickets.size();
    }
}