package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.service.FitnessGoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/fitnessGoals")
public class FitnessGoalsController {

    private final FitnessGoalsService fitnessGoalsService;

    @Autowired
    public FitnessGoalsController(FitnessGoalsService fitnessGoalsService) {
        this.fitnessGoalsService = fitnessGoalsService;
    }

    @PostMapping
    public ResponseEntity<FitnessGoals> createFitnessGoals(@RequestBody FitnessGoals fitnessGoals) {
        FitnessGoals createdFitnessGoals = fitnessGoalsService.saveFitnessGoals(fitnessGoals);
        return new ResponseEntity<>(createdFitnessGoals, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<FitnessGoals>> getAllFitnessGoals() {
        List<FitnessGoals> fitnessGoalsList = fitnessGoalsService.getAllFitnessGoals();
        return new ResponseEntity<>(fitnessGoalsList, HttpStatus.OK);
    }

    @GetMapping("/{memberId}")
    public ResponseEntity<FitnessGoals> getFitnessGoalsById(@PathVariable Long memberId) {
        FitnessGoals fitnessGoals = fitnessGoalsService.getFitnessGoalsById(memberId);
        return new ResponseEntity<>(fitnessGoals, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFitnessGoals(@PathVariable("id") Integer id) {
        fitnessGoalsService.deleteFitnessGoals(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/updateGoal")
    public ResponseEntity<String> updateGoalDetails(@RequestBody FitnessGoals goal) {
        try {
            fitnessGoalsService.updateGoalDetails(Long.valueOf(goal.getGoalID()), goal.getGoalDate(), goal.getGoalDescription()
                    , goal.getTargetWeight(), goal.getTargetBodyFat(), goal.getTargetMuscleMass());
            return ResponseEntity.ok("Member's goal updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's goal");
        }
    }
}
