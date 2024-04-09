package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "FitnessGoals")
@Getter
@Setter
public class FitnessGoals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goalID")
    private Integer goalID;

    @Column(name = "goal_description")
    private String goalDescription;

    @Column(name = "goal_date")
    private LocalDate goalDate;

    @Column(name = "target_weight")
    private BigDecimal targetWeight;

    @Column(name = "target_body_fat")
    private BigDecimal targetBodyFat;

    @Column(name = "target_muscle_mass")
    private BigDecimal targetMuscleMass;

    @ManyToOne
    @JoinColumn(name = "memberID", referencedColumnName = "memberID")
    private Member member;

    // Constructors
}
