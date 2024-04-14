package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/members")
@CrossOrigin
public class MemberController {

    @Autowired
    private MemberService memberService;


    @GetMapping
    public ResponseEntity<List<Member>> getAllMembers() {
        List<Member> memberList = memberService.getAllMembers();
        return new ResponseEntity<>(memberList, HttpStatus.OK);
    }
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Member request) {
        ResponseEntity<String> response = memberService.userRegistration(request.getFirstName(), request.getLastName(),
                request.getPhoneNumber(), request.getEmail(), request.getPassword(),
                request.getMemberTypeId());
        return response;
    }

    @GetMapping("/{memberEmail}")
    public ResponseEntity<Member> getMemberInfo(@PathVariable String memberEmail) {
        Member user = memberService.getMemberInfo(memberEmail);
        if (user != null) {
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/updateFirstName")
    public ResponseEntity<String> updateMemberFirstName(@PathVariable Long id, @RequestParam String newFirstName) {
        try {
            memberService.updateMemberFirstName(id, newFirstName);
            return ResponseEntity.ok("Member's first name updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's first name");
        }
    }

    @PutMapping("/{id}/updateLastName")
    public ResponseEntity<String> updateMemberLastName(@PathVariable Long id, @RequestParam String newLastName) {
        try {
            memberService.updateMemberLastName(id, newLastName);
            return ResponseEntity.ok("Member's last name updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's last name");
        }
    }

    @PutMapping("/{id}/updateEmail")
    public ResponseEntity<String> updateMemberEmail(@PathVariable Long id, @RequestParam String newEmail) {
        try {
            memberService.updateMemberEmail(id, newEmail);
            return ResponseEntity.ok("Member's email updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's email");
        }
    }

    @PutMapping("/{id}/updatePhoneNumber")
    public ResponseEntity<String> updateMemberPhoneNumber(@PathVariable Long id, @RequestParam String newPhoneNumber) {
        try {
            memberService.updateMemberPhoneNumber(id, newPhoneNumber);
            return ResponseEntity.ok("Member's phone number updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's phone number");
        }
    }

    @PutMapping("/{id}/updatePassword")
    public ResponseEntity<String> updateMemberPassword(@PathVariable Long id, @RequestParam String newPassword) {
        try {
            memberService.updateMemberPassword(id, newPassword);
            return ResponseEntity.ok("Member's password updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's password");
        }
    }

    @GetMapping("/{firstName}/{lastName}/searchMember")
    public ResponseEntity<List<Member>> getMemberByNameAndLastName(@PathVariable String firstName, @PathVariable String lastName){
        return new ResponseEntity<>(memberService.findMemberByName(firstName,lastName), HttpStatus.OK);
    }


}
