package org.oop.realtimeticketingsystem.purchase;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "purchases")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Purchase {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_id", nullable = false)
    private Long ticketId;

    @Column(name = "customer_id", nullable = false)
    private String customerId; // Use Thread ID for simulation

    @Column(name = "purchased_at", updatable = false)
    private LocalDateTime purchasedAt = LocalDateTime.now();
}
