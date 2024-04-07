//package com.example.HealthFitnessClubManagement.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import java.time.LocalTime;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "TakesClass")
//public class TakesClass {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "takesID")
//    private Long takesId;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "memberID", nullable = false)
//    private Member member;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "classID", nullable = false)
//    private GroupFitnessClass groupFitnessClass;
//
//
//    public void setMember(Member member) {
//        this.member = member;
//    }
//
//    public void setGroupFitnessClass(GroupFitnessClass groupFitnessClass) {
//        this.groupFitnessClass = groupFitnessClass;
//    }
//
//}