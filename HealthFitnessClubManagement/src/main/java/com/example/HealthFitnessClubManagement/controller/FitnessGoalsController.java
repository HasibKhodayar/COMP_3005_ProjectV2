package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.service.FitnessGoalsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
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

    @GetMapping("/{id}")
    public ResponseEntity<FitnessGoals> getFitnessGoalsById(@PathVariable("id") Integer id) {
        FitnessGoals fitnessGoals = fitnessGoalsService.getFitnessGoalsById(id);
        System.out.println("id passed in fitness controller" + id);
        System.out.println("fitnessGoals" + fitnessGoals);
        return new ResponseEntity<>(fitnessGoals, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFitnessGoals(@PathVariable("id") Integer id) {
        fitnessGoalsService.deleteFitnessGoals(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{goalId}/updateGoal")
    public ResponseEntity<String> updateGoalDetails(@PathVariable Long goalId, @RequestParam String goalDate, @RequestParam String desc,
                                                    @RequestParam double weight, @RequestParam double bodyFat, @RequestParam double muscleMass) {
        try {
            fitnessGoalsService.updateGoalDetails(goalId, goalDate, desc, weight, bodyFat, muscleMass);
            return ResponseEntity.ok("Member's goal updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's goal");
        }
    }
}
