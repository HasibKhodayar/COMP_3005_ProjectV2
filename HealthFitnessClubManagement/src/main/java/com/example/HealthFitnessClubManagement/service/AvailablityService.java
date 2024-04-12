package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.PersonalTrainingSession;
import com.example.HealthFitnessClubManagement.model.TrainerAvailability;
import com.example.HealthFitnessClubManagement.repository.AvailabilityRepository;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.TrainingSessionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AvailablityService {

    @Autowired
    private AvailabilityRepository availabilityRepository;
    @Autowired
    private TrainingSessionRepository sessionRepository;

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

    public ResponseEntity<String> deleteAvailability(Long trainerId, String day) {
        try {
            TrainerAvailability availabilityToDelete = availabilityRepository.findByTrainerAndDayAvailable(trainerId, day);

            if (availabilityToDelete != null) {
                availabilityRepository.delete(availabilityToDelete);
                return ResponseEntity.ok("Availability Deleted successfully");
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during availability deletion");
        }
    }

    public TrainerAvailability findByTrainerAndDayAvailable(Long trainerId, String day){
        TrainerAvailability haveTrainer = availabilityRepository.findByTrainerAndDayAvailable(trainerId, day);
        if(haveTrainer != null){
            return haveTrainer;
        }

        return null;
    }

    public List<TrainerAvailability> getDaysAvailableByTrainerId(Long trainerId){
        return availabilityRepository.getAvailableDaysByTrainer(trainerId);
    }

    public List<Member> getAvailableTrainers(){
        return availabilityRepository.getTrainersAvailable();
    }

    public boolean updateTimeSlot1(Long id, boolean available){return availabilityRepository.updateTimeSlot1(id, available) > 0;}
    public boolean updateTimeSlot2(Long id, boolean available){return availabilityRepository.updateTimeSlot2(id, available) > 0;}
    public boolean updateTimeSlot3(Long id, boolean available){return availabilityRepository.updateTimeSlot3(id, available) > 0;}
    public boolean updateTimeSlot4(Long id, boolean available){return availabilityRepository.updateTimeSlot4(id, available) > 0;}
    public boolean updateTimeSlot5(Long id, boolean available){return availabilityRepository.updateTimeSlot5(id, available) > 0;}
    public boolean updateTimeSlot6(Long id, boolean available){return availabilityRepository.updateTimeSlot6(id, available) > 0;}
    public boolean updateTimeSlot7(Long id, boolean available){return availabilityRepository.updateTimeSlot7(id, available) > 0;}
    public boolean updateTimeSlot8(Long id, boolean available){return availabilityRepository.updateTimeSlot8(id, available) > 0;}

    public ArrayList<String> mapSlotsIntoTimes(Long availabilityId){
        TrainerAvailability availabilityDay = availabilityRepository.findByAvailabilityId(availabilityId);
        if(availabilityDay != null){
            ArrayList<String> times = new ArrayList<>();
            if(availabilityDay.isTimeSlot1()){
                times.add("9:00 am");
            }
            if(availabilityDay.isTimeSlot2()){
                times.add("10:00 am");
            }
            if(availabilityDay.isTimeSlot3()){
                times.add("11:00 am");
            }
            if(availabilityDay.isTimeSlot4()){
                times.add("12:00 pm");
            }
            if(availabilityDay.isTimeSlot5()){
                times.add("1:00 pm");
            }
            if(availabilityDay.isTimeSlot6()){
                times.add("2:00 pm");
            }
            if(availabilityDay.isTimeSlot7()){
                times.add("3:00 pm");
            }
            if(availabilityDay.isTimeSlot8()){
                times.add("4:00 pm");
            }

            return times;
        }

        return null;
    }

    public boolean bookOrCancelTime(Long trainerId, String day, String time, boolean bookCancel){
        if(! time.isEmpty()){
            Long availabilityId = (availabilityRepository.findByTrainerAndDayAvailable(trainerId,day)).getAvailabilityID();
            switch (time){
                case "9:00 am":
                    return updateTimeSlot1(availabilityId, bookCancel);
                case "10:00 am":
                    return updateTimeSlot2(availabilityId, bookCancel);
                case "11:00 am":
                    return updateTimeSlot3(availabilityId, bookCancel);
                case "12:00 pm":
                    return updateTimeSlot4(availabilityId, bookCancel);
                case "1:00 pm":
                    return updateTimeSlot5(availabilityId, bookCancel);
                case "2:00 pm":
                    return updateTimeSlot6(availabilityId, bookCancel);
                case "3:00 pm":
                    return updateTimeSlot7(availabilityId, bookCancel);
                case "4:00 pm":
                    return updateTimeSlot8(availabilityId, bookCancel);
            }
        }

        return false;
    }

    public ResponseEntity<String> createPrivateSession(Member member, Member trainer, String day, String time) {
        try {
            PersonalTrainingSession session = new PersonalTrainingSession();

            session.setMember(member);
            session.setTrainer(trainer);
            session.setScheduledDate(day);
            session.setScheduledTime(time);

            PersonalTrainingSession savedSession = sessionRepository.save(session);
            return ResponseEntity.ok("Session Created successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during session creation");
        }
    }

    public ResponseEntity<String> deletePrivateSession(PersonalTrainingSession session) {
        try {
                sessionRepository.delete(session);
                return ResponseEntity.ok("Session Deleted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during session deletion");
        }
    }

    public PersonalTrainingSession getSessionBySessionId(Long sessionId){
       return sessionRepository.getSessionById(sessionId);
    }

    public List<PersonalTrainingSession> getAllSessionsByMemberId(Long memberId){
        return sessionRepository.getAllSessionByMemberId(memberId);
    }

}
