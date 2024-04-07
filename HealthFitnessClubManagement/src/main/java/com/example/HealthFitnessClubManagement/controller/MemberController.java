package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.model.HealthMetric;
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

    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody Member request) {
        ResponseEntity<String> response = memberService.userRegistration(request.getFirstName(), request.getLastName(),
                request.getPhoneNumber(), request.getEmail(), request.getPass_word(),
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

    @PostMapping("/createGoal")
    public ResponseEntity<String> createFitnessGoal(@RequestBody FitnessGoals request) {
        ResponseEntity<String> response = memberService.createFitnessGoal(request.getMember(), request.getGoalDescription(),
                request.getTargetWeight(),request.getTargetBodyFat(),request.getTargetMuscleMass());
        return response;
    }

    @GetMapping("/getGoal")
    public ResponseEntity<FitnessGoals> getFitnessGoal(@PathVariable Long memberId) {
        FitnessGoals goal = memberService.findGoalByMember(memberId);
        if (goal != null) {
            return ResponseEntity.ok(goal);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/updateFGDesc")
    public ResponseEntity<String> updateFGDescription(@PathVariable Long id, @RequestParam String newDescription) {
        try {
            memberService.updateFitnessGoalDescription(id, newDescription);
            return ResponseEntity.ok("Member's fitness goal description updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's fitness goal description");
        }
    }

    @PutMapping("/{id}/updateFGTargetWeight")
    public ResponseEntity<String> updateFGTargetWeight(@PathVariable Long id, @RequestParam Double newTargetWeight) {
        try {
            memberService.updateFGTargetWeight(id, newTargetWeight);
            return ResponseEntity.ok("Member's target weight updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's target weight");
        }
    }

    @PutMapping("/{id}/updateFGTargetBodyFat")
    public ResponseEntity<String> updateFGTargetBodyFat(@PathVariable Long id, @RequestParam Double newTargetBodyFat) {
        try {
            memberService.updateFGTargetBodyFat(id, newTargetBodyFat);
            return ResponseEntity.ok("Member's target body fat percentage updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's target body fat percentage");
        }
    }

    @PutMapping("/{id}/updateFGTargetMuscleMass")
    public ResponseEntity<String> updateFGTargetMuscleMass(@PathVariable Long id, @RequestParam Double newTargetMuscleMass) {
        try {
            memberService.updateFGTargetMuscleMass(id, newTargetMuscleMass);
            return ResponseEntity.ok("Member's target muscle mass updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's target muscle mass");
        }
    }

    @PostMapping("/createHealthMetric")
    public ResponseEntity<String> createHealthMetric(@RequestBody HealthMetric request) {
        ResponseEntity<String> response = memberService.createHealthMetric(request.getMember(), request.getMetricDate(),
                request.getWeight(),request.getHeight(),request.getBodyFatPercentage(),request.getMuscleMass());
        return response;
    }

    @GetMapping("/getMetrics")
    public ResponseEntity<List<HealthMetric>> getHealthMetrics(@PathVariable Long memberId) {
        List<HealthMetric> metrics = memberService.findMetric(memberId);
        if (! metrics.isEmpty()) {
            return ResponseEntity.ok(metrics);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}/updateMetricDate")
    public ResponseEntity<String> updateMetricDate(@PathVariable Long id, @RequestParam Date newMetricDate) {
        try {
            memberService.updateMetricDate(id, newMetricDate);
            return ResponseEntity.ok("Member's metric date updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's health metric date");
        }
    }

    @PutMapping("/{id}/updateWeight")
    public ResponseEntity<String> updateWeight(@PathVariable Long id, @RequestParam Double newWeight) {
        try {
            memberService.updateWeight(id, newWeight);
            return ResponseEntity.ok("Member's weight updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's weight");
        }
    }

    @PutMapping("/{id}/updateHeight")
    public ResponseEntity<String> updateHeight(@PathVariable Long id, @RequestParam Double newHeight) {
        try {
            memberService.updateHeight(id, newHeight);
            return ResponseEntity.ok("Member's height updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's height");
        }
    }

    @PutMapping("/{id}/updateBodyFat")
    public ResponseEntity<String> updateBodyFat(@PathVariable Long id, @RequestParam Double newBodyFat) {
        try {
            memberService.updateBodyFat(id, newBodyFat);
            return ResponseEntity.ok("Member's body fat percentage updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's body fat percentage");
        }
    }

    @PutMapping("/{id}/updateMuscleMass")
    public ResponseEntity<String> updateMuscleMass(@PathVariable Long id, @RequestParam Double newMuscleMass) {
        try {
            memberService.updateMuscleMass(id, newMuscleMass);
            return ResponseEntity.ok("Member's muscle mass updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's muscle mass");
        }
    }

}
