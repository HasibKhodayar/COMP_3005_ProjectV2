package com.example.HealthFitnessClubManagement.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table(name = "HealthMetrics")
public class HealthMetric {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "metricID")
    private Long id;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "memberID", referencedColumnName = "memberID")
    private Member member;

    @Getter
    @Setter
    @Column(name = "metric_date")
    private LocalDateTime metricDate;

    @Getter
    @Setter
    @Column(name = "weight")
    private Double weight;

    @Getter
    @Setter
    @Column(name = "height")
    private Double height;

    @Getter
    @Setter
    @Column(name = "body_fat_perc")
    private Double bodyFat;

    @Getter
    @Setter
    @Column(name = "muscle_mass")
    private Double muscleMass;

}
