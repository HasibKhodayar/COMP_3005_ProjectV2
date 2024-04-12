package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.sql.Date;

@Repository
public interface FitnessGoalsRepository extends JpaRepository<FitnessGoals, Integer> {
    // You can add custom query methods here if needed

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.goalDescription = :newDescription WHERE f.goalID = :goalId")
    void updateFitnessGoalDescription(Long goalId, String newDescription);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.goalDate = :newDate WHERE f.goalID = :goalId")
    void updateFitnessGoalDate(Long goalId, Date newDate);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.targetWeight = :newTargetWeight WHERE f.goalID = :goalId")
    void updateTargetWeight(Long goalId, BigDecimal newTargetWeight);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.targetBodyFat = :newTargetBodyFat WHERE f.goalID = :goalId")
    void updateTargetBodyFat(Long goalId, BigDecimal newTargetBodyFat);

    @Modifying
    @Transactional
    @Query("UPDATE FitnessGoals f SET f.targetMuscleMass = :newTargetMuscleMass WHERE f.goalID = :goalId")
    void updateTargetMuscleMass(Long goalId, BigDecimal newTargetMuscleMass);

    @Query("SELECT g FROM FitnessGoals g WHERE g.member.memberID = :memberId")
    FitnessGoals getByMemberId(Long memberId);

}
