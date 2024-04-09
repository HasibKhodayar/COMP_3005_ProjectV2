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


    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.metricDate = :newDate WHERE m.id = :metricID")
    void updateMetricDate(Long metricID, Date newDate);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.weight = :newWeight WHERE m.id = :metricID")
    void updateWeight(Long metricID, Double newWeight);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.height = :newHeight WHERE m.id = :metricID")
    void updateHeight(Long metricID, Double newHeight);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.bodyFatPercentage = :newBodyFat WHERE m.id = :metricID")
    void updateBodyFatPerc(Long metricID, Double newBodyFat);

    @Modifying
    @Transactional
    @Query("UPDATE HealthMetric m SET m.muscleMass = :newMuscleMass WHERE m.id = :metricID")
    void updateMuscleMass(Long metricID, Double newMuscleMass);

    @Query("SELECT m FROM HealthMetric m WHERE m.member = :memberID ORDER BY m.metricDate DESC LIMIT 1")
    HealthMetric findMostRecentMetric(Long memberID);
}
