package org.oop.realtimeticketingsystem.tickets;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class RemoveTicketRequest {
    private int count;
    private String customerId;
}
