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
@RequestMapping("/goals")
@CrossOrigin
public class FitnessGoalsController {
    @Autowired
    private GoalsService goalsService;

//    @PostMapping("/createGoal")
//    public ResponseEntity<String> createFitnessGoal(@RequestBody FitnessGoals request) {
//        ResponseEntity<String> response = goalsService.createFitnessGoal(request.getMember(), request.getGoalDescription(),
//                request.getTargetWeight(),request.getTargetBodyFat(),request.getTargetMuscleMass());
//        return response;
//    }

    @GetMapping("/{memberId}/getGoal")
    public ResponseEntity<FitnessGoals> getFitnessGoal(@PathVariable Long memberId) {
        FitnessGoals goal = goalsService.findGoalByMember(memberId);
        System.out.println("memberId" + memberId);
        System.out.println("goal:" + goal);
        if (goal != null) {
            return ResponseEntity.ok(goal);
        } else {
            System.out.println("Goal not found.");
            return ResponseEntity.notFound().build();
        }
    }

//    @GetMapping("/{goalId}/getGoalbyId")
//    public ResponseEntity<FitnessGoals> getFitnessGoalbyId(@PathVariable Long goalId) {
//        FitnessGoals goal = goalsService.findGoalByMemberID(goalId);
//        System.out.println("memberId" + goalId);
//        System.out.println("goal:" + goal);
//        if (goal != null) {
//            return ResponseEntity.ok(goal);
//        } else {
//            System.out.println("Goal not found.");
//            return ResponseEntity.notFound().build();
//        }
//    }

//    @PutMapping("/{id}/updateFGDesc")
//    public ResponseEntity<String> updateFGDescription(@PathVariable Long id, @RequestParam String newDescription) {
//        try {
//            goalsService.updateFitnessGoalDescription(id, newDescription);
//            return ResponseEntity.ok("Member's fitness goal description updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's fitness goal description");
//        }
//    }
//
//    @PutMapping("/{id}/updateFGTargetWeight")
//    public ResponseEntity<String> updateFGTargetWeight(@PathVariable Long id, @RequestParam Double newTargetWeight) {
//        try {
//            goalsService.updateFGTargetWeight(id, newTargetWeight);
//            return ResponseEntity.ok("Member's target weight updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's target weight");
//        }
//    }
//
//    @PutMapping("/{id}/updateFGTargetBodyFat")
//    public ResponseEntity<String> updateFGTargetBodyFat(@PathVariable Long id, @RequestParam Double newTargetBodyFat) {
//        try {
//            goalsService.updateFGTargetBodyFat(id, newTargetBodyFat);
//            return ResponseEntity.ok("Member's target body fat percentage updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's target body fat percentage");
//        }
//    }
//
//    @PutMapping("/{id}/updateFGTargetMuscleMass")
//    public ResponseEntity<String> updateFGTargetMuscleMass(@PathVariable Long id, @RequestParam Double newTargetMuscleMass) {
//        try {
//            goalsService.updateFGTargetMuscleMass(id, newTargetMuscleMass);
//            return ResponseEntity.ok("Member's target muscle mass updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's target muscle mass");
//        }
//    }
}
