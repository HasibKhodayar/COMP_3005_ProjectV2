package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.TakesClass;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface TakesClassRepository extends JpaRepository<TakesClass, Long> {

    @Query("SELECT t FROM TakesClass t WHERE t.member.memberID = :memberId AND t.groupFitnessClass.classID = :classId")
    TakesClass getTakesClassByMemberIdAndClassId(Long memberId, Long classId);

    @Modifying
    @Transactional
    @Query("select t FROM TakesClass t WHERE t.groupFitnessClass.classID =:classId")
    List<TakesClass> getTakesByClass(Long classId);

}
