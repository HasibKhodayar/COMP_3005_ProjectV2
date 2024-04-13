package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;

@Entity
@Table(name = "Billing")
public class Billing {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "billingID")
    private Long equipmentId;


    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "member_email", referencedColumnName = "email")
    private Member member;

    @Getter
    @Setter
    @Column(name = "payment_date")
    private Date paymentDate;

    @Getter
    @Setter
    @Column(name = "amount")
    private double amount;

    @Getter
    @Setter
    @Column(name = "purchase_type")
    private String purchaseType;
}
