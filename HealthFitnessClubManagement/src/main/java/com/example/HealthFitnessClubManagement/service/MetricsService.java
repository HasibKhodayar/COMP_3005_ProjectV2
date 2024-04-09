//package com.example.HealthFitnessClubManagement.service;
//
//import com.example.HealthFitnessClubManagement.model.HealthMetric;
//import com.example.HealthFitnessClubManagement.model.Member;
//import com.example.HealthFitnessClubManagement.model.FitnessGoals;
//import com.example.HealthFitnessClubManagement.repository.FitnessGoalsRepository;
//import com.example.HealthFitnessClubManagement.repository.HealthMetricsRepository;
//import com.example.HealthFitnessClubManagement.repository.MemberRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.stereotype.Service;
//
//import java.sql.Date;
//import java.time.LocalDate;
//import java.util.List;
//
//@Service
//public class MetricsService {
//
//    @Autowired
//    private MemberRepository memberRepository;
//    @Autowired
//    private HealthMetricsRepository healthMetricsRepository;
//
//
//    public ResponseEntity<String> createHealthMetric(Member member, LocalDate metricDate , Double weight, Double height, Double bodyFat, Double muscleMass) {
//        try {
//            HealthMetric metric = new HealthMetric();
//            metric.setMember(member);
//            metric.setMetricDate(metricDate);
//            metric.setWeight(weight);
//            metric.setHeight(height);
//            metric.setBodyFatPercentage(bodyFat);
//            metric.setMuscleMass(muscleMass);
//
//            HealthMetric savedMetric = healthMetricsRepository.save(metric);
//            return ResponseEntity.ok("Health metric successfully created");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during metric creation");
//        }
//    }
//
//    public List<HealthMetric> findMetric(Long memberId){
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));
//
//        return healthMetricsRepository.findMetricByMember(member);
//    }
//
//    public void updateMetricDate(Long id, Date newMetricDate){
//        healthMetricsRepository.updateMetricDate(id, newMetricDate);
//    }
//
//    public void updateWeight(Long id, Double newWeight){
//        healthMetricsRepository.updateWeight(id, newWeight);
//    }
//
//    public void updateHeight(Long id, Double newHeight){
//        healthMetricsRepository.updateHeight(id, newHeight);
//    }
//
//    public void updateBodyFat(Long id, double newBodyFat){
//        healthMetricsRepository.updateBodyFatPerc(id, newBodyFat);
//    }
//
//    public void updateMuscleMass(Long id, double newMuscleMass){
//        healthMetricsRepository.updateMuscleMass(id, newMuscleMass);
//    }
//
//    public HealthMetric mostRecentMetricDate(Long memberId){
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));
//        return healthMetricsRepository.findMostRecentMetric(member);
//    }
//}
