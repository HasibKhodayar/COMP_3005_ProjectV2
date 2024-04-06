package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/members")
@CrossOrigin
public class MemberController {

    @Autowired
    private MemberService memberService;

    @PostMapping("/register")
    public ResponseEntity<int[]> registerUser(@RequestBody Member request) {
        int[] result = memberService.userRegistration(request.getFirstName(), request.getLastName(),
                request.getEmail(), request.getPhoneNumber(),
                request.getMemberTypeId());
        return ResponseEntity.ok(result);
    }
}
