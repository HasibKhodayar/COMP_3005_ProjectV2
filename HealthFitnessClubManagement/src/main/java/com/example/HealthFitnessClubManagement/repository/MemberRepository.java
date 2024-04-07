package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {
    boolean existsByEmail(String email);
    Member findByEmail(String email);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.firstName = :newFirstName WHERE m.id = :member_id")
    void updateMemberFirstNameById(Long member_id, String newFirstName);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.lastName = :newLastName WHERE m.id = :member_id")
    void updateMemberLastNameByID(Long member_id, String newLastName);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.email = :newEmail WHERE m.id = :member_id")
    void updateMemberEmailById(Long member_id, String newEmail);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.phoneNumber = :newPhoneNumber WHERE m.id = :member_id")
    void updateMemberPhoneNumberById(Long member_id, String newPhoneNumber);

    @Modifying
    @Transactional
    @Query("UPDATE Member m SET m.pass_word = :newPassword WHERE m.id = :member_id")
    void updateMemberPasswordById(Long member_id, String newPassword);

    @Query("SELECT m FROM Member m WHERE m.firstName = :userFirstName AND m.lastName = :userLastName")
    List<Member> findMembersByFullName(String userFirstName, String userLastName);


}