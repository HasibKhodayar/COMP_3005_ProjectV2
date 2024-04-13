package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.time.LocalDate;

@Entity
@Table(name = "TakesClass")
public class TakesClass {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "takesID")
    private Long takesId;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "memberID", referencedColumnName = "memberID" , nullable = false)
    private Member member;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "classID", referencedColumnName = "classID", nullable = false)
    private GroupFitnessClass groupFitnessClass;

}