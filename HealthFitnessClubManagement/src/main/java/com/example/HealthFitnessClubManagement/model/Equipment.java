package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalTime;
import java.time.LocalDate;

@Entity
@Table(name = "Equipment")
public class Equipment {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "equipmentID")
    private Long equipmentId;

    @Getter
    @Setter
    @Column(name = "equipment_name", nullable = false)
    private String equipmentName;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "roomID", referencedColumnName = "roomID")
    private Room room;

    @Getter
    @Setter
    @Column(name = "last_maintenance_date")
    private Date lastMaintenanceDate;

    @Getter
    @Setter
    @Column(name = "eq_condition")
    private String eqCondition;


}
