//package com.example.HealthFitnessClubManagement.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import java.time.LocalTime;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "Equipment")
//public class Equipment {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "equipmentID")
//    private Long id;
//
//    @Getter
//    @Column(name = "equipment_name", nullable = false)
//    private String equipmentName;
//
//    @Getter
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "roomID")
//    private Room room;
//
//    @Getter
//    @Column(name = "last_maintenance_date")
//    private LocalDate lastMaintenanceDate;
//
//
//    public void setEquipmentName(String equipmentName) {
//        this.equipmentName = equipmentName;
//    }
//
//    public void setRoom(Room room) {
//        this.room = room;
//    }
//
//    public void setLastMaintenanceDate(LocalDate lastMaintenanceDate) {
//        this.lastMaintenanceDate = lastMaintenanceDate;
//    }
//
//    // Getters can be added if needed
//}
