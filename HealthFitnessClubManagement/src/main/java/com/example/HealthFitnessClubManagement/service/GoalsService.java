package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.FitnessGoals;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.repository.FitnessGoalsRepository;
import com.example.HealthFitnessClubManagement.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class GoalsService {
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private FitnessGoalsRepository fitnessGoalsRepository;

//    public ResponseEntity<String> createFitnessGoal(Member member, String description, Double targetWeight, Double targetBodyFat, Double targetMuscleMass) {
//        try {
//
//            FitnessGoals goal = new FitnessGoals();
//            goal.setGoalDescription(description);
//            //goal.setMember(member);
//            goal.setTargetWeight(targetWeight);
//            goal.setTargetBodyFat(targetBodyFat);
//            goal.setTargetMuscleMass(targetMuscleMass);
//
//            FitnessGoals savedGoal = fitnessGoalsRepository.save(goal);
//            return ResponseEntity.ok("Goal succesfully created");
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during goal creation");
//        }
//    }

//    public FitnessGoals findGoalByMember(Long memberId){
//        Member member = memberRepository.findById(memberId)
//                .orElseThrow(() -> new IllegalArgumentException("Member not found with ID: " + memberId));
//        System.out.println("inside service, member is" + member.getEmail());
//        return fitnessGoalsRepository.findFitnessGoalsByMember(member);
//    }

//    public FitnessGoals findGoalByMemberID(Long memberId) {
//
//        return fitnessGoalsRepository.findFitnessGoalsByMemberID(memberId);
//    }

    public FitnessGoals findGoalByMember(Long memberId){

        return fitnessGoalsRepository.findFitnessGoalByMember(memberId);
    }

//    public FitnessGoals findGoalByID(Long id){
//
//        return fitnessGoalsRepository.findFitnessGoalByGoal(id);
//    }

//    public void updateFitnessGoalDescription(Long id, String goalDescription){
//        fitnessGoalsRepository.updateFitnessGoalDescription(id, goalDescription);
//    }
//
//    public void updateFGTargetWeight(Long id, Double targetWeight){
//        fitnessGoalsRepository.updateTargetWeight(id, targetWeight);
//    }
//
//    public void updateFGTargetBodyFat(Long id, Double targetBodyFat){
//        fitnessGoalsRepository.updateTargetBodyFat(id, targetBodyFat);
//    }
//
//    public void updateFGTargetMuscleMass(Long id, double targetMuscleMass){
//        fitnessGoalsRepository.updateTargetMuscleMass(id, targetMuscleMass);
//    }

}