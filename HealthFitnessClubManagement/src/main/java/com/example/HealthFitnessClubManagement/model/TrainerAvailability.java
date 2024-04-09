package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.time.LocalDate;

@Entity
@Table(name = "TrainerAvailability")
public class TrainerAvailability {

    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "availabilityID")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Getter
    @Setter
    @JoinColumn(name = "memberID")
    private Member trainer;

    @Getter
    @Setter
    @Column(name = "day_available")
    private String dayAvailable;

    @Getter
    @Setter
    @Column(name = "time_slot_1")
    private boolean timeSlot1 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_2")
    private boolean timeSlot2 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_3")
    private boolean timeSlot3 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_4")
    private boolean timeSlot4 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_5")
    private boolean timeSlot5 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_6")
    private boolean timeSlot6 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_7")
    private boolean timeSlot7 = true;

    @Getter
    @Setter
    @Column(name = "time_slot_8")
    private boolean timeSlot8 = true;

}

