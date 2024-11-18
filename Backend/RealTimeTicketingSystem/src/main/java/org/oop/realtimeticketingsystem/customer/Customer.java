package org.oop.realtimeticketingsystem.customer;

import lombok.RequiredArgsConstructor;
import org.oop.realtimeticketingsystem.tickets.TicketPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class Customer implements Runnable {

    private final TicketPool ticketPool;
    private final int customerRetrievalRate;
    private static final Logger log = LoggerFactory.getLogger(Customer.class);

    @Override
    public void run() {
        while (true) {
            synchronized (ticketPool) {
                int ticketsToRemove = customerRetrievalRate;
                ticketPool.removeTickets(ticketsToRemove, String.valueOf(Thread.currentThread().getId())); // Use thread ID as customer ID
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Customer thread was interrupted.", e);
                break;
            }
        }
    }
}
