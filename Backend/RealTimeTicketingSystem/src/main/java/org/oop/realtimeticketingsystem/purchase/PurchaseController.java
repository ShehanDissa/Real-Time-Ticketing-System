package org.oop.realtimeticketingsystem.purchase;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/purchase")
@CrossOrigin
public class PurchaseController {

    private final PurchaseService purchaseService;

    @Autowired
    public PurchaseController(PurchaseService purchaseService) {
        this.purchaseService = purchaseService;
    }

    @GetMapping("/count")
    public ResponseEntity<?> getPurchaseCount() {
        try {
            return ResponseEntity.ok(purchaseService.getPurchaseCount());
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching purchase count. " + e.getMessage());
        }
    }

    @GetMapping ("/all")
    public ResponseEntity<?> getAllPurchases(@RequestParam Integer pageNumber) {
        try {
            return ResponseEntity.ok(purchaseService.getAllPurchases(pageNumber));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Error fetching all purchases. " + e.getMessage());
        }
    }
}
