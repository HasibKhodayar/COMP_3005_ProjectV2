package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.GroupFitnessClass;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.model.PersonalTrainingSession;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Repository
public interface GroupClassRepository extends JpaRepository<GroupFitnessClass, Long> {

    @Query("SELECT c FROM GroupFitnessClass c WHERE c.classID = :classId")
    GroupFitnessClass getClassById(Long classId);

    @Query("SELECT c FROM TakesClass t JOIN GroupFitnessClass c ON t.groupFitnessClass.classID = c.classID WHERE t.member.memberID = :memberId")
    List<GroupFitnessClass> getAllClassesByMemberId(Long memberId);

    @Query("SELECT c FROM GroupFitnessClass c")
    List<GroupFitnessClass> getAllClasses();

    @Modifying
    @Transactional
    @Query("UPDATE GroupFitnessClass c SET c.scheduledDate = :day WHERE c.classID = :classId")
    int updateClassDay(Long classId, String day);

    @Modifying
    @Transactional
    @Query("UPDATE GroupFitnessClass c SET c.scheduledTime = :time WHERE c.classID = :classId")
    int updateClassTime(Long classId, String time);


}
