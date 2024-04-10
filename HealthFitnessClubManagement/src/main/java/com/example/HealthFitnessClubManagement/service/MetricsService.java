package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.model.HealthMetric;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.HealthMetricsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.List;

@Service
public class MetricsService {

    private final HealthMetricsRepository metricsRepository;

    @Autowired
    public MetricsService(HealthMetricsRepository metricsRepositoryRepository) {
        this.metricsRepository = metricsRepositoryRepository;
    }


    public HealthMetric saveHealthMetric(HealthMetric metric) {
        return metricsRepository.save(metric);
    }

    public HealthMetric getMostRecentMetricByMember(Long memberId) {
        return metricsRepository.findMostRecentMetric(memberId);
    }


    public List<HealthMetric> getAllHealthMetrics(Long memberId) {
        return metricsRepository.findAllMetrics(memberId);
    }



    public void deleteHealthMetric(Long id) {
        metricsRepository.deleteById(id);
    }

    public void updateMetricDetails(Long metricId, String newMetricDate, double newWeight, double newHeight, double newBodyFat, double newMuscleMass){
        try{
            metricsRepository.updateMetricDate(metricId, new Date(((new SimpleDateFormat("yyyy-MM-dd")).parse(newMetricDate)).getTime()));
            metricsRepository.updateWeight(metricId, newWeight);
            metricsRepository.updateHeight(metricId, newHeight);
            metricsRepository.updateBodyFatPerc(metricId, newBodyFat);
            metricsRepository.updateMuscleMass(metricId, newMuscleMass);
        }catch (Exception e){e.printStackTrace();System.out.println("Sorry could not update health metrics");}
    }

}
