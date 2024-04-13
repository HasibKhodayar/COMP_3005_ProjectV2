package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.ExerciseRoutine;
import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.repository.RoutineRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoutineService {

    @Autowired
    private RoutineRepository routineRepository;

    public ResponseEntity<String> saveRoutine(ExerciseRoutine routine) {
        try {
            routineRepository.save(routine);
            return ResponseEntity.ok("Successfully created exercise routine");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during routine creation");
        }
    }

    public ResponseEntity<String> deleteRoutine(Long routineId) {
        try {
            routineRepository.delete(routineRepository.findRoutineById(routineId));
            return ResponseEntity.ok("Succesfully deleted excerise routine");
        }catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during routine deletion");
        }
    }

    public List<ExerciseRoutine> getAllRoutinesByMember(Long memberId){
        return routineRepository.getRoutinesByMemberId(memberId);
    }
}
