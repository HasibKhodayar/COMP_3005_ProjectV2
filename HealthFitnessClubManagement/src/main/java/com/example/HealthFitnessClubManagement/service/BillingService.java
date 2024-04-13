package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.Billing;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.BillingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;

@Service
public class BillingService {

    @Autowired
    private BillingRepository billingRepository;


    public List<Billing> getAllBilling(){
        return billingRepository.getAllBilling();
    }

    public List<Billing> getBillsByMember(Long memberId){
        return billingRepository.getBillsByMember(memberId);
    }

    public ResponseEntity<String> createNewBilling(Member member, double amount, String purchaseType ){
        try{
            Billing bill = new Billing();
            bill.setMember(member);
            bill.setAmount(amount);
            bill.setPurchaseType(purchaseType);
            bill.setPaymentDate(Date.valueOf(LocalDate.now()));
            billingRepository.save(bill);
            return ResponseEntity.ok("Bill succesfully saved");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during bill creation");
        }
    }
}
