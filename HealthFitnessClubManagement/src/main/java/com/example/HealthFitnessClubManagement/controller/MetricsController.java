package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.HealthMetric;
import com.example.HealthFitnessClubManagement.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/healthMetrics")
@CrossOrigin

public class MetricsController {

    private final MetricsService metricsService;

    @Autowired
    public MetricsController(MetricsService metricsService) {
        this.metricsService = metricsService;
    }

    @PostMapping
    public ResponseEntity<String> createHealthMetric(@RequestBody HealthMetric metric) {
        return metricsService.createHealthMetric(metric);
    }

    @GetMapping("/{id}/getAllMetrics")
    public ResponseEntity<List<HealthMetric>> getAllMetricsByMemberId(@PathVariable("id") Long memberId) {
        List<HealthMetric> metricList = metricsService.getAllHealthMetrics(memberId);
        return new ResponseEntity<>(metricList, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<HealthMetric> getHealthMetricByMemberId(@PathVariable("id") Long id) {
        HealthMetric healthMetric = metricsService.getMostRecentMetricByMember(id);
        return new ResponseEntity<>(healthMetric, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHealthMetric(@PathVariable("id") Long id) {
        metricsService.deleteHealthMetric(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/{metricID}/updateMetric")
    public ResponseEntity<String> updateMetricDetails(@PathVariable("metricID") Long metricID, @RequestBody HealthMetric metric) {
        try {
            metricsService.updateMetricDetails(metricID, metric.getWeight(),
                    metric.getHeight(), metric.getBodyFat(), metric.getMuscleMass());

            return ResponseEntity.ok("Member's Health Metric updated successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's health metrics");
        }
    }
}
