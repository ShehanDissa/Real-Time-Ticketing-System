package org.oop.realtimeticketingsystem.config;

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