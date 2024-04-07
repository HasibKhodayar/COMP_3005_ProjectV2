package com.example.HealthFitnessClubManagement.model;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.Date;

@Entity
@Table(name = "FitnessGoals")
public class FitnessGoals {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goalID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @JoinColumn(name = "memberID")
    private Member member;

    @Getter
    @Column(name = "goal_description")
    private String goalDescription;

    @Getter
    @Column(name = "target_weight")
    private Double targetWeight;

    @Getter
    @Column(name = "target_body_fat")
    private Double targetBodyFat;

    @Getter
    @Column(name = "target_muscle_mass")
    private Double targetMuscleMass;


    public void setMember(Member member) {
        this.member = member;
    }

    public void setGoalDescription(String goalDescription) {
        this.goalDescription = goalDescription;
    }

    public void setTargetWeight(Double targetWeight) {
        this.targetWeight = targetWeight;
    }

    public void setTargetBodyFat(Double targetBodyFat) {
        this.targetBodyFat = targetBodyFat;
    }

    public void setTargetMuscleMass(Double targetMuscleMass) {
        this.targetMuscleMass = targetMuscleMass;
    }
}