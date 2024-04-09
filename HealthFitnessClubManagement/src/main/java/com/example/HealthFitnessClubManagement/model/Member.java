package com.example.HealthFitnessClubManagement.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Entity
@Table(name = "Members")
public class Member {
    @Id
    @Getter
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Setter
    @Column(name = "memberID")
    private Long id;

    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
    private FitnessGoals fitnessGoal;

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
    @Column(name = "pass_word", nullable = false)
    private String pass_word;

    @Getter
    @Column(name = "member_type_ID")
    private Integer memberTypeId;


    public void setFirstName(String firstName) {this.firstName = firstName;}

    public void setLastName(String lastName) {this.lastName = lastName;}

    public void setEmail(String email) {this.email = email;}

    public void setPhoneNumber(String phoneNumber) {this.phoneNumber = phoneNumber;}

    public void setPass_word(String pass_word) {this.pass_word = pass_word;}

    public void setMemberTypeId(Integer memberTypeId) {
        this.memberTypeId = memberTypeId;
    }

}

