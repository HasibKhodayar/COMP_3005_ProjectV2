package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;

import java.util.Date;

@Entity
@Table(name = "Members")
public class Member {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "memberID")
    private Long id;

    @Getter
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Getter
    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Getter
    @Column(name = "email", nullable = false)
    private String email;

    @Getter
    @Column(name = "phone_number")
    private String phoneNumber;

    @Getter
    @Column(name = "join_date")
    private Date joinDate;

    @Getter
    @Column(name = "member_type_ID")
    private Integer memberTypeId;


    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setJoinDate(Date joinDate) {
        this.joinDate = joinDate;
    }

    public void setMemberTypeId(Integer memberTypeId) {
        this.memberTypeId = memberTypeId;
    }
}

