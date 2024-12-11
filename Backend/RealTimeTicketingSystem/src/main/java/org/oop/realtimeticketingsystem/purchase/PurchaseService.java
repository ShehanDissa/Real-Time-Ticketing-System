package org.oop.realtimeticketingsystem.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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

    public List<Purchase> getAllPurchases(Integer pageNumber) {
        Sort sort = Sort.by(Sort.Direction.DESC, "purchasedAt");
        var pageable = PageRequest.of(0, 1000, sort);
        return purchaseRepository.findAll(pageable).getContent();
    }
}