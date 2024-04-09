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
    @Query("Update TrainerAvailability SET timeSlot1 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot1(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot2 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot2(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot3 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot3(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot4 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot4(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot5 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot5(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot6 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot6(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot7 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot7(Long availabilityId, boolean available);

    @Modifying
    @Query("Update TrainerAvailability SET timeSlot8 = :available WHERE id = :availabilityId")
    boolean updateTimeSlot8(Long availabilityId, boolean available);

}
