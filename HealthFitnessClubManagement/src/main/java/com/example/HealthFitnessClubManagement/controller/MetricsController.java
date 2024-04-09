//package com.example.HealthFitnessClubManagement.controller;
//
//import com.example.HealthFitnessClubManagement.model.HealthMetric;
//import com.example.HealthFitnessClubManagement.model.Member;
//import com.example.HealthFitnessClubManagement.service.*;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.sql.Date;
//import java.util.List;
//
//@RestController
//@RequestMapping("/metrics")
//@CrossOrigin
//
//public class MetricsController {
//
//    @Autowired
//    private MetricsService metricService;
//
//    @PostMapping("/createHealthMetric")
//    public ResponseEntity<String> createHealthMetric(@RequestBody HealthMetric request) {
//        ResponseEntity<String> response = metricService.createHealthMetric(request.getMember(), request.getMetricDate(),
//                request.getWeight(),request.getHeight(),request.getBodyFatPercentage(),request.getMuscleMass());
//        return response;
//    }
//
//    @GetMapping("{memberId}/getMetrics")
//    public ResponseEntity<List<HealthMetric>> getHealthMetrics(@PathVariable Long memberId) {
//        List<HealthMetric> metrics = metricService.findMetric(memberId);
//        if (! metrics.isEmpty()) {
//            return ResponseEntity.ok(metrics);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//
//    @PutMapping("/{id}/updateMetricDate")
//    public ResponseEntity<String> updateMetricDate(@PathVariable Long id, @RequestParam Date newMetricDate) {
//        try {
//            metricService.updateMetricDate(id, newMetricDate);
//            return ResponseEntity.ok("Member's metric date updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's health metric date");
//        }
//    }
//
//    @PutMapping("/{id}/updateWeight")
//    public ResponseEntity<String> updateWeight(@PathVariable Long id, @RequestParam Double newWeight) {
//        try {
//            metricService.updateWeight(id, newWeight);
//            return ResponseEntity.ok("Member's weight updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's weight");
//        }
//    }
//
//    @PutMapping("/{id}/updateHeight")
//    public ResponseEntity<String> updateHeight(@PathVariable Long id, @RequestParam Double newHeight) {
//        try {
//            metricService.updateHeight(id, newHeight);
//            return ResponseEntity.ok("Member's height updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's height");
//        }
//    }
//
//    @PutMapping("/{id}/updateBodyFat")
//    public ResponseEntity<String> updateBodyFat(@PathVariable Long id, @RequestParam Double newBodyFat) {
//        try {
//            metricService.updateBodyFat(id, newBodyFat);
//            return ResponseEntity.ok("Member's body fat percentage updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's body fat percentage");
//        }
//    }
//
//    @PutMapping("/{id}/updateMuscleMass")
//    public ResponseEntity<String> updateMuscleMass(@PathVariable Long id, @RequestParam Double newMuscleMass) {
//        try {
//            metricService.updateMuscleMass(id, newMuscleMass);
//            return ResponseEntity.ok("Member's muscle mass updated successfully");
//        } catch (Exception e) {
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to update member's muscle mass");
//        }
//    }
//
//    @GetMapping("{memberId}/getRecentMetrics")
//    public ResponseEntity<HealthMetric> getRecentMetric(@PathVariable Long memberId) {
//        HealthMetric metric = metricService.mostRecentMetricDate(memberId);
//        if (metric != null) {
//            return ResponseEntity.ok(metric);
//        } else {
//            return ResponseEntity.notFound().build();
//        }
//    }
//}
