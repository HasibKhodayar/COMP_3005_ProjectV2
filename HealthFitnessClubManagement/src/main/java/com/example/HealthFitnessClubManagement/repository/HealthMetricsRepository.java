package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.HealthMetric;
import com.example.HealthFitnessClubManagement.model.Member;
import jakarta.persistence.Entity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public interface HealthMetricsRepository extends JpaRepository<HealthMetric, Long>{

    @Query("SELECT m FROM HealthMetric m WHERE m.member = :memberId")
    List<HealthMetric> findMetricByMember(Member memberId);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.metricDate = :newDate WHERE m.id = :id")
    void updateMetricDate(Long id, Date newDate);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.weight = :newWeight WHERE m.id = :id")
    void updateWeight(Long id, Double newWeight);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.height = :newHeight WHERE m.id = :id")
    void updateHeight(Long id, Double newHeight);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.bodyFatPercentage = :newBodyFat WHERE m.id = :id")
    void updateBodyFatPerc(Long id, Double newBodyFat);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.muscleMass = :newMuscleMass WHERE m.id = :id")
    void updateMuscleMass(Long id, Double newMuscleMass);

}