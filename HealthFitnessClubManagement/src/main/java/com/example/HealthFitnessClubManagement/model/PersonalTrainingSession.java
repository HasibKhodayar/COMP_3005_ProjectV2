package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.time.LocalDate;


@Entity
@Table(name = "PersonalTrainingSession")
public class PersonalTrainingSession {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "sessionID")
    private Long sessionId;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "memberID", referencedColumnName = "memberID")
    private Member member;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "trainerID", referencedColumnName = "memberID")
    private Member trainer;

    @Getter
    @Setter
    @Column(name = "scheduled_date", nullable = false)
    private String scheduledDate;

    @Getter
    @Setter
    @Column(name = "scheduled_time", nullable = false)
    private String scheduledTime;

}
