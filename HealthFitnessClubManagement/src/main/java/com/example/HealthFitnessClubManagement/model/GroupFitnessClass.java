//package com.example.HealthFitnessClubManagement.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import java.time.LocalTime;
//import java.time.LocalDate;
//
//
//@Entity
//@Table(name = "GroupFitnessClass")
//public class GroupFitnessClass {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "classID")
//    private Long id;
//
//    @Getter
//    @Column(name = "class_name", nullable = false)
//    private String className;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "trainerID")
//    private Member trainer;
//
//    @Getter
//    @Column(name = "scheduled_date", nullable = false)
//    private LocalDate scheduledDate;
//
//    @Getter
//    @Column(name = "scheduled_time", nullable = false)
//    private LocalTime scheduledTime;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "roomID")
//    private Room room;
//
//    @Getter
//    @Column(name = "number_members", nullable = false)
//    private int numberMembers;
//
//    public void setClassName(String className) {
//        this.className = className;
//    }
//
//    public void setTrainer(Member trainer) {
//        this.trainer = trainer;
//    }
//
//    public void setScheduledDate(LocalDate scheduledDate) {
//        this.scheduledDate = scheduledDate;
//    }
//
//    public void setScheduledTime(LocalTime scheduledTime) {
//        this.scheduledTime = scheduledTime;
//    }
//
//    public void setRoom(Room room) {
//        this.room = room;
//    }
//
//    public void setNumberMembers(int numberMembers) {
//        this.numberMembers = numberMembers;
//    }
//}
