package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.TrainerAvailability;
import com.example.HealthFitnessClubManagement.repository.AvailabilityRepository;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class AvailablityService {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private AvailabilityRepository availabilityRepository;

    public ResponseEntity<String> createAvailability(Member trainer, String day ) {
        try {
            TrainerAvailability availability = new TrainerAvailability();

            availability.setTrainer(trainer);
            availability.setDayAvailable(day);

            TrainerAvailability savedAvailability = availabilityRepository.save(availability);
            return ResponseEntity.ok("Availability Created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during availability creation");
        }
    }

    public void deleteTrainerAvailability(Long availabilityId) {
        availabilityRepository.deleteById(availabilityId);
    }
    public void updateTimeSlot1(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot2(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot3(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot4(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot5(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot6(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot7(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}
    public void updateTimeSlot8(Long id, boolean available){availabilityRepository.updateTimeSlot1( id, available);}

}
