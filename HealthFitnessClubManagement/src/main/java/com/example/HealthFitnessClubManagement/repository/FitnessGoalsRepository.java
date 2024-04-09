package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FitnessGoalsRepository extends JpaRepository<FitnessGoals, Integer> {
    // You can add custom query methods here if needed
}
