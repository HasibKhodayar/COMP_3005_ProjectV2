package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.model.TrainerAvailability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface AvailabilityRepository extends JpaRepository<TrainerAvailability, Long> {

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot1 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot1(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot2 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot2(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot3 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot3(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot4 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot4(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot5 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot5(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot6 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot6(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot7 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot7(Long availabilityId, boolean available);

    @Modifying
    @Transactional
    @Query("Update TrainerAvailability SET timeSlot8 = :available WHERE availabilityID = :availabilityId")
    int updateTimeSlot8(Long availabilityId, boolean available);

    @Query("SELECT a FROM TrainerAvailability a WHERE a.trainer.memberID = :trainerId AND a.dayAvailable = :day")
    TrainerAvailability findByTrainerAndDayAvailable(Long trainerId, String day);

    @Query("SELECT a FROM TrainerAvailability a WHERE a.availabilityID = :availabilityId")
    TrainerAvailability findByAvailabilityId(Long availabilityId);

    @Query("SELECT a FROM TrainerAvailability a WHERE a.trainer.memberID = :trainerID")
    List<TrainerAvailability> getAvailableDaysByTrainer(Long trainerID);

    @Query("SELECT DISTINCT a.trainer FROM TrainerAvailability a")
    List<Member> getTrainersAvailable();

}
