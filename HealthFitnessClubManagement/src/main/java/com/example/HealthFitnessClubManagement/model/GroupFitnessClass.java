package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.time.LocalDate;


@Entity
@Table(name = "GroupFitnessClass")
public class GroupFitnessClass {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "classID")
    private Long classID;

    @Getter
    @Setter
    @Column(name = "class_name")
    private String className;

    @Getter
    @Setter
    @Column(name = "scheduled_date" )
    private String scheduledDate;

    @Getter
    @Setter
    @Column(name = "scheduled_time")
    private String scheduledTime;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "roomID", referencedColumnName = "roomID")
    private Room room;

    @Getter
    @Setter
    @Column(name = "number_members")
    private int numberMembers;

}
