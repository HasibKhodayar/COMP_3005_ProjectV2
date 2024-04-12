package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public List<Member> getAllMembers() {
        return memberRepository.findAll();
    }

    public ResponseEntity<String> userRegistration(String firstName, String lastName, String phone, String email, String password, int memberType) {
        try {
            Member member = new Member();
            if (memberRepository.existsByEmail(email)) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to register user. Email already exists.");
            }
            member.setFirstName(firstName);
            member.setLastName(lastName);
            member.setEmail(email);
            member.setPassword(password);
            member.setPhoneNumber(phone);
            member.setMemberTypeId(memberType);

            Member savedMember = memberRepository.save(member);
            return ResponseEntity.ok("User registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during user registration");
        }
    }

    public Member getMemberInfo(String userEmail) {
        return memberRepository.findByEmail(userEmail);
    }

    public void updateMemberFirstName(Long id, String newFirstName) {
        memberRepository.updateMemberFirstNameById(id, newFirstName);
    }

    public void updateMemberLastName(Long id, String newLastName) {
        memberRepository.updateMemberLastNameByID(id, newLastName);
    }

    public void updateMemberEmail(Long id, String newEmail) {
        memberRepository.updateMemberEmailById(id, newEmail);
    }

    public void updateMemberPhoneNumber(Long id, String newPhoneNumber) {
        memberRepository.updateMemberPhoneNumberById(id, newPhoneNumber);
    }

    public void updateMemberPassword(Long id, String newPassword) {
        memberRepository.updateMemberPasswordById(id, newPassword);
    }


    public List<Member> findMemberByName(String firstName, String lastName){
        return memberRepository.findMembersByFullName(firstName, lastName);
    }

    public Member getMemberById(Long id){
        return memberRepository.findMembersById(id);
    }

}