//package com.example.HealthFitnessClubManagement.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import java.time.LocalTime;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "TrainerAvailability")
//public class TrainerAvailability {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "sessionID")
//    private Long sessionId;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "trainerID", nullable = false)
//    private Member trainer;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "memberID")
//    private Member member;
//
//    @Getter
//    @Column(name = "available_date", nullable = false)
//    private LocalDate availableDate;
//
//    @Getter
//    @Column(name = "start_time", nullable = false)
//    private LocalTime startTime;
//
//    @Getter
//    @Column(name = "end_time", nullable = false)
//    private LocalTime endTime;
//
//
//    public void setTrainer(Member trainer) {
//        this.trainer = trainer;
//    }
//
//    public void setMember(Member member) {
//        this.member = member;
//    }
//
//    public void setAvailableDate(LocalDate availableDate) {
//        this.availableDate = availableDate;
//    }
//
//    public void setStartTime(LocalTime startTime) {
//        this.startTime = startTime;
//    }
//
//    public void setEndTime(LocalTime endTime) {
//        this.endTime = endTime;
//    }
//
//}
//
