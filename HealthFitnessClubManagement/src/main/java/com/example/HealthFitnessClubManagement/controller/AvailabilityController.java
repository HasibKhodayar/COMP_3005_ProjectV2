package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.HealthMetric;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.model.PersonalTrainingSession;
import com.example.HealthFitnessClubManagement.model.TrainerAvailability;
import com.example.HealthFitnessClubManagement.service.AvailablityService;
import com.example.HealthFitnessClubManagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/availability")
public class AvailabilityController {
    private final AvailablityService availablityService;
    @Autowired
    private MemberService memberService;

    @Autowired
    public AvailabilityController(AvailablityService availablityService) {
        this.availablityService = availablityService;
    }


    @PostMapping("/{trainerId}/{day}/createAvailability")
    public ResponseEntity<String> createAvailability(@PathVariable("trainerId") Long trainerId, @PathVariable("day") String day) {
        TrainerAvailability alreadyPosted = availablityService.findByTrainerAndDayAvailable(trainerId, day);
        if(alreadyPosted == null){
            return availablityService.createAvailability(memberService.getMemberById(trainerId), day);
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Availability already Exists");
    }

    @DeleteMapping("/{id}/{day}/deleteAvailability")
    public ResponseEntity<String> deleteAvailability(@PathVariable("id") Long trainerId, @PathVariable("day") String day) {
        return availablityService.deleteAvailability(trainerId, day);
    }

    @GetMapping("/getAvailableTrainers")
    public ResponseEntity<List<Member>> getAllAvailabilityTrainers() {
        List<Member> availableTrainersList = availablityService.getAvailableTrainers();
        return new ResponseEntity<>(availableTrainersList, HttpStatus.OK);
    }

    @GetMapping("/{id}/getAvailableDays")
    public ResponseEntity<List<TrainerAvailability>> getAllAvailabilityDaysByTrainer(@PathVariable("id") Long trainerId) {
        List<TrainerAvailability> availability = availablityService.getDaysAvailableByTrainerId(trainerId);
        return new ResponseEntity<>(availability, HttpStatus.OK);
    }

    @GetMapping("/{id}/getAvailableTimes")
    public ResponseEntity<ArrayList<String>> getAvailableTimesById(@PathVariable("id") Long availabilityId){
        return new ResponseEntity<>(availablityService.mapSlotsIntoTimes(availabilityId), HttpStatus.OK);
    }

    @PutMapping("/{memberId}/{trainerId}/{day}/{time}/bookSession")
    public ResponseEntity<String> bookAvailableTime(@PathVariable Long memberId, @PathVariable Long trainerId, @PathVariable String day, @PathVariable String time) {
        if(availablityService.bookOrCancelTime(trainerId,day,time,false)){
            Member member = memberService.getMemberById(memberId);
            Member trainer = memberService.getMemberById(trainerId);
            availablityService.createPrivateSession(member, trainer, day, time);
            return ResponseEntity.ok("Sucesfully Booked Session");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to book Session");
        }
    }

    @DeleteMapping("/{sessionId}/cancelSession")
    public ResponseEntity<String> cancelSession(@PathVariable Long sessionId) {
        PersonalTrainingSession session = availablityService.getSessionBySessionId(sessionId);
        if(availablityService.bookOrCancelTime(session.getTrainer().getMemberID(), session.getScheduledDate(), session.getScheduledTime(),true)){
            availablityService.deletePrivateSession(session);
            return ResponseEntity.ok("Sucesfully canceled Session");
        }
        else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to cancel Session");
        }
    }


    @GetMapping("/{memberId}/getSessions")
    public ResponseEntity<List<PersonalTrainingSession>> getAllSessions(@PathVariable Long memberId) {
        List<PersonalTrainingSession> sessions = availablityService.getAllSessionsByMemberId(memberId);
        return new ResponseEntity<>(sessions, HttpStatus.OK);
    }
}
