package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.time.LocalDate;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    public int[] userRegistration(String firstName, String lastName, String email, String password, String phone, int memberType) {
        try {
            Member member = new Member();
            member.setFirstName(firstName);
            member.setLastName(lastName);
            member.setEmail(email);
            member.setPass_word(password);
            member.setPhoneNumber(phone);
            member.setJoinDate(Date.valueOf(LocalDate.now()));
            member.setMemberTypeId(memberType);

            Member savedMember = memberRepository.save(member);
// address: check for existing user
//            if (savedMember != null) {
//                return loginExistingUser(firstName, lastName);
//            }

        } catch (Exception e) {
            e.printStackTrace();
        }
        return new int[]{0};
    }
}
