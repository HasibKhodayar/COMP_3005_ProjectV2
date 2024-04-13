package com.example.HealthFitnessClubManagement.model;

import lombok.Getter;
import lombok.Setter;

public class RoomWithBookedStatus {
    // Getters and setters
    @Getter
    @Setter
    private Room room;

    @Getter
    @Setter
    private boolean isBooked;

    @Getter
    @Setter
    private String className;

    // Constructor
    public RoomWithBookedStatus(Room room, boolean isBooked, String className) {
        this.room = room;
        this.isBooked = isBooked;
        this.className = className;
    }

}
