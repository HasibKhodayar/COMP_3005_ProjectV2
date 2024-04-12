package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.repository.FitnessGoalsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.sql.Date;
import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class FitnessGoalsService {

    private final FitnessGoalsRepository fitnessGoalsRepository;

    @Autowired
    public FitnessGoalsService(FitnessGoalsRepository fitnessGoalsRepository) {
        this.fitnessGoalsRepository = fitnessGoalsRepository;
    }

    // Method to save FitnessGoals
    public FitnessGoals saveFitnessGoals(FitnessGoals fitnessGoals) {
        return fitnessGoalsRepository.save(fitnessGoals);
    }

    // Method to get all FitnessGoals
    public List<FitnessGoals> getAllFitnessGoals() {
        return fitnessGoalsRepository.findAll();
    }

    // Method to get FitnessGoals by ID
    public FitnessGoals getFitnessGoalsById(Integer id) {
        return fitnessGoalsRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("FitnessGoals with ID " + id + " not found"));
    }

    // Method to delete FitnessGoals by ID
    public void deleteFitnessGoals(Integer id) {
        fitnessGoalsRepository.deleteById(id);
    }

    public void updateGoalDetails(Long goalId, Date date, String newDescription, BigDecimal newTargetWeight, BigDecimal newTargetBodyFat, BigDecimal newTargetMuscleMass){
        try {
            fitnessGoalsRepository.updateFitnessGoalDate(goalId, date);
            fitnessGoalsRepository.updateFitnessGoalDescription(goalId, newDescription);
            fitnessGoalsRepository.updateTargetWeight(goalId, newTargetWeight);
            fitnessGoalsRepository.updateTargetBodyFat(goalId, newTargetBodyFat);
            fitnessGoalsRepository.updateTargetMuscleMass(goalId, newTargetMuscleMass);
        }catch (Exception e){e.printStackTrace(); System.out.println("Failed to update Fitness Goal");}
    }
}
