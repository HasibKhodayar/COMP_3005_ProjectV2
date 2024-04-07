//package com.example.HealthFitnessClubManagement.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//
//import java.sql.Date;
//import java.sql.Time;
//
//@Entity
//@Table(name = "PersonalTrainingSession")
//public class PersonalTrainingSession {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "memberID")
//    private Long id;
//
//    @Getter
//    @Column(name = "trainerID", nullable = false)
//    private int trianerId;
//
//    @Getter
//    @Column(name = "memberId")
//    private int memberId;
//
//    @Getter
//    @Column(name = "available_date", nullable = false)
//    private Date available_date;
//
//    @Getter
//    @Column(name = "start_time", nullable = false)
//    private Time start_time;
//
//    @Getter
//    @Column(name = "end_time", nullable = false)
//    private int end_time;
//
//    public void setTrianerId(int trianerId) {
//        this.trianerId = trianerId;
//    }
//
//    public void setMemberId(int memberId) {
//        this.memberId = memberId;
//    }
//
//    public void setAvailable_date(Date available_date) {
//        this.available_date = available_date;
//    }
//
//    public void setStart_time(Time start_time) {
//        this.start_time = start_time;
//    }
//
//    public void setEnd_time(int end_time) {
//        this.end_time = end_time;
//    }
//}
