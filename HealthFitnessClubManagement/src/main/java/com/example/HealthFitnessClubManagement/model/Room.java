package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalTime;
import java.time.LocalDate;

@Entity
@Table(name = "Room")
public class Room {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "roomID")
    private Long roomId;

    @Getter
    @Setter
    @Column(name = "room_name", nullable = false)
    private String roomName;

    @Getter
    @Setter
    @Column(name = "capacity", nullable = false)
    private int capacity;



}
