//package com.example.HealthFitnessClubManagement.model;
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDate;
//import java.util.Date;
//
//
//@Entity
//@Table(name = "HealthMetrics")
//public class HealthMetric {
//
//    @Id
//    @Getter
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "metricID")
//    private Long id;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "memberID")
//    private Member member;
//
//    @Getter
//    @Setter
//    @Column(name = "metric_date", nullable = false)
//    private LocalDate metricDate;
//
//    @Getter
//    @Setter
//    @Column(name = "weight")
//    private Double weight;
//
//    @Getter
//    @Setter
//    @Column(name = "height")
//    private Double height;
//
//    @Getter
//    @Setter
//    @Column(name = "body_fat_perc")
//    private Double bodyFatPercentage;
//
//    @Getter
//    @Setter
//    @Column(name = "muscle_mass")
//    private Double muscleMass;
//
//    public void setMember(Member member) {
//        this.member = member;
//    }
//
//    public Member getMember() {
//        return member;
//    }
//}
