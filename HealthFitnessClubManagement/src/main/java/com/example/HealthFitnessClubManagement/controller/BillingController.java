package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.Billing;
import com.example.HealthFitnessClubManagement.service.BillingService;
import com.example.HealthFitnessClubManagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/billing")
public class BillingController {

    @Autowired
    private BillingService billingService;
    @Autowired
    private MemberService memberService;

    @GetMapping("/getAllBills")
    public ResponseEntity<List<Billing>> getAllBills(){
        return new ResponseEntity<>(billingService.getAllBilling(), HttpStatus.OK);
    }

    @GetMapping("/{memberId}/getBills")
    public ResponseEntity<List<Billing>> getBillsByMember(@PathVariable Long memberId){
        return new ResponseEntity<>(billingService.getBillsByMember(memberId), HttpStatus.OK);
    }

    @PostMapping("/{email}/{amount}/{type}/pay")
    public ResponseEntity<String> createBill(@PathVariable String email, @PathVariable double amount, @PathVariable String type){
        return billingService.createNewBilling(memberService.getMemberInfo(email),amount,type);
    }


}
