package org.oop.realtimeticketingsystem.applicationconfig;

import lombok.*;


@Data
@NoArgsConstructor
@AllArgsConstructor
public class Configuration {
    private int totalTickets;
    private int ticketReleaseRate;
    private int customerRetrievalRate;
    private int maxTicketCapacity;
}