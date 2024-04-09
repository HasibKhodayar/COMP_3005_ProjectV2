package com.example.HealthFitnessClubManagement.model;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "FitnessGoals")
public class FitnessGoals {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "goalID")
    private Long goalID;

    @Getter
    @Setter
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "memberID")  // This is the foreign key column in the FitnessGoals table
    private Member member;

    @Column(name = "goal_description")
    private String goalDescription;

    @Column(name = "goal_date")
    private Date goalDate;

    @Column(name = "target_weight")
    private Double targetWeight;

    @Column(name = "target_body_fat")
    private Double targetBodyFat;

    @Column(name = "target_muscle_mass")
    private Double targetMuscleMass;

    // Getters and Setters
    public Long getGoalID() {
        return goalID;
    }

    public void setGoalID(Long goalID) {
        this.goalID = goalID;
    }


    public String getGoalDescription() {
        return goalDescription;
    }

    public void setGoalDescription(String goalDescription) {
        this.goalDescription = goalDescription;
    }

    public Date getGoalDate() {
        return goalDate;
    }

    public void setGoalDate(Date goalDate) {
        this.goalDate = goalDate;
    }

    public Double getTargetWeight() {
        return targetWeight;
    }

    public void setTargetWeight(Double targetWeight) {
        this.targetWeight = targetWeight;
    }

    public Double getTargetBodyFat() {
        return targetBodyFat;
    }

    public void setTargetBodyFat(Double targetBodyFat) {
        this.targetBodyFat = targetBodyFat;
    }

    public Double getTargetMuscleMass() {
        return targetMuscleMass;
    }

    public void setTargetMuscleMass(Double targetMuscleMass) {
        this.targetMuscleMass = targetMuscleMass;
    }
}
