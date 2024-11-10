package org.oop.realtimeticketingsystem.tickets;

import lombok.Data;

@Data
public class Ticket {
    private final int ticketId;
    private final int seatNumber;


    public Ticket(int ticketId, int seatNumber) {
        this.ticketId = ticketId;
        this.seatNumber = seatNumber;
    }

    public Ticket(int ticketId) {
        this.ticketId = ticketId;
        this.seatNumber = ticketId;
    }

    public Ticket() {
        this.ticketId = 0;
        this.seatNumber = 0;
    }
}
