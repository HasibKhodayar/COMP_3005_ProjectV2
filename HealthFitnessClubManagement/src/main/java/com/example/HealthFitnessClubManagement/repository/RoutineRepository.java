package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.ExerciseRoutine;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoutineRepository extends JpaRepository<ExerciseRoutine, Long> {

    @Query("SELECT e FROM ExerciseRoutine e WHERE e.member.memberID = :memberId")
    List<ExerciseRoutine> getRoutinesByMemberId(Long memberId);

    @Query("SELECT e FROM ExerciseRoutine e WHERE e.routineID = :routineId")
    ExerciseRoutine findRoutineById(Long routineId);

}
