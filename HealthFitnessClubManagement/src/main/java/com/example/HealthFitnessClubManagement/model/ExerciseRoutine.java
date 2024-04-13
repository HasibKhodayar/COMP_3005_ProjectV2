package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "ExerciseRoutine")
public class ExerciseRoutine {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "routineID")
    private Long routineID;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "memberID", referencedColumnName = "memberID")
    private Member member;

    @Getter
    @Setter
    @Column(name = "exercise_name")
    private String name;

    @Getter
    @Setter
    @Column(name = "reps")
    private int reps;

    @Getter
    @Setter
    @Column(name = "routine_set")
    private int sets;
}
