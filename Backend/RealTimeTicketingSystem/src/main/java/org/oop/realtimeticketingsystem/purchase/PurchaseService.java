package org.oop.realtimeticketingsystem.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;

@Service
public class PurchaseService {
    private final PurchaseRepository purchaseRepository;

    @Autowired
    public PurchaseService(PurchaseRepository purchaseRepository) {
        this.purchaseRepository = purchaseRepository;
    }

    public Integer getPurchaseCount() {
        return Math.toIntExact(purchaseRepository.count());
    }

    public List<Purchase> getAllPurchases() {
        return purchaseRepository.findAll();
    }
}