package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.model.PersonalTrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface TrainingSessionRepository extends JpaRepository<PersonalTrainingSession, Long>{

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot1 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot1(Long availabilityId, boolean available);

    @Query("SELECT s FROM PersonalTrainingSession s WHERE s.sessionId = :sessionId")
    PersonalTrainingSession getSessionById(Long sessionId);

    @Query("SELECT s FROM PersonalTrainingSession s WHERE s.member.memberID = :memberId")
    List<PersonalTrainingSession> getAllSessionByMemberId(Long memberId);

}
