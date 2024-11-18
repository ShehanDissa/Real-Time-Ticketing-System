package org.oop.realtimeticketingsystem.vendor;

import lombok.RequiredArgsConstructor;
import org.oop.realtimeticketingsystem.tickets.TicketPool;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RequiredArgsConstructor
public class Vendor implements Runnable {

    private final TicketPool ticketPool;
    private final int ticketReleaseRate;
    private final int maxCapacity;
    private static final Logger log = LoggerFactory.getLogger(Vendor.class);

    @Override
    public void run() {
        while (true) {
            synchronized (ticketPool) {
                int currentCount = ticketPool.getTicketCount();
                int ticketsToAdd;

                if (currentCount + ticketReleaseRate > maxCapacity) {
                    ticketsToAdd = maxCapacity - currentCount;
                } else {
                    ticketsToAdd = ticketReleaseRate;
                }

                if (ticketsToAdd > 0) {
                    ticketPool.addTickets(ticketsToAdd);
                    if (currentCount + ticketReleaseRate > maxCapacity) {
                        log.info("Vendor released {} tickets. Ticket Pool is full.", ticketsToAdd);
                    } else {
                        log.info("Vendor released {} tickets.", ticketsToAdd);
                    }
                }
            }
            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
                log.warn("Vendor thread was interrupted.", e);
                break;
            }
        }
    }
}
