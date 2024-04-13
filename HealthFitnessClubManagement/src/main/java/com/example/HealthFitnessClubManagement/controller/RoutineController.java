package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.ExerciseRoutine;
import com.example.HealthFitnessClubManagement.service.RoutineService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/routines")
public class RoutineController {

    @Autowired
    private RoutineService routineService;

    @PostMapping
    public ResponseEntity<String> createRoutine(@RequestBody ExerciseRoutine routine){
        return routineService.saveRoutine(routine);
    }

    @DeleteMapping("/{routineId}/deleteRoutine")
    public ResponseEntity<String> deleteRoutine(@PathVariable Long routineId){
        return routineService.deleteRoutine(routineId);
    }

    @GetMapping("/{memberId}/getRoutines")
    public ResponseEntity<List<ExerciseRoutine>> getAllRoutinesByMember(@PathVariable Long memberId){
        return new ResponseEntity<>(routineService.getAllRoutinesByMember(memberId), HttpStatus.OK);
    }
}
