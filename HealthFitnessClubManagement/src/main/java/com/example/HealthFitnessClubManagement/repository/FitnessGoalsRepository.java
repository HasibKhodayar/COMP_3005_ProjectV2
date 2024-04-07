package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.model.Member;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface FitnessGoalsRepository extends JpaRepository<FitnessGoals, Long>{

    @Query("SELECT f FROM FitnessGoals f WHERE f.member = :memberId")
    FitnessGoals findFitnessGoalByMember(Member memberId);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.goalDescription = :newDescription WHERE f.id = :goalId")
    void updateFitnessGoalDescription(Long goalId, String newDescription);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.targetWeight = :newTargetWeight WHERE f.id = :goalId")
    void updateTargetWeight(Long goalId, Double newTargetWeight);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.targetBodyFat = :newTargetBodyFat WHERE f.id = :goalId")
    void updateTargetBodyFat(Long goalId, Double newTargetBodyFat);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.targetMuscleMass = :newTargetMuscleMass WHERE f.id = :goalId")
    void updateTargetMuscleMass(Long goalId, Double newTargetMuscleMass);

}
