package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.*;
import com.example.HealthFitnessClubManagement.repository.GroupClassRepository;
import com.example.HealthFitnessClubManagement.repository.RoomRepository;
import com.example.HealthFitnessClubManagement.repository.TakesClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GroupClassService {
    @Autowired
    private GroupClassRepository classRepository;
    @Autowired
    private RoomRepository roomRepository;
    @Autowired
    private TakesClassRepository takesClassRepository;

    public ResponseEntity<String> registerForClass(Member member, GroupFitnessClass groupClass) {
        try {
            Room classRoom = roomRepository.getRoomAssociatedWithClass(groupClass.getClassID());
            if(classRoom == null || groupClass.getNumberMembers() < (classRoom.getCapacity())){
                TakesClass t = new TakesClass();
                t.setMember(member);
                t.setGroupFitnessClass(groupClass);
                groupClass.setNumberMembers(groupClass.getNumberMembers() + 1);
                TakesClass savedTakes = takesClassRepository.save(t);
                return ResponseEntity.ok("Successfully registered for class");
            }
            else {
                return ResponseEntity.ok("Sorry the class is full.");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during class registration");
        }
    }

    public ResponseEntity<String> unRegisterForClass(Long memberId, Long classId) {
        try {
            GroupFitnessClass groupClass = classRepository.getClassById(classId);
            groupClass.setNumberMembers(groupClass.getNumberMembers() - 1);
            TakesClass t = takesClassRepository.getTakesClassByMemberIdAndClassId(memberId, classId);
            takesClassRepository.delete(t);
            return ResponseEntity.ok("Unregistered from class successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during class unregistration");
        }
    }

    public List<GroupFitnessClass> getAllCLasses(){
        return classRepository.getAllClasses();
    }

    public List<GroupFitnessClass> getClassesByMember(Long memberId){
        return classRepository.getAllClassesByMemberId(memberId);
    }

    public GroupFitnessClass getClassById(Long classId){
        return classRepository.getClassById(classId);
    }

    public ResponseEntity<String> updateClassDay(Long classId, String day){
        if(classRepository.updateClassDay(classId,day) > 0){
            return ResponseEntity.ok("Class scheduled day updated");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during class schedule updating");

    }

    public ResponseEntity<String> updateClassTime(Long classId, String time){
        if(classRepository.updateClassTime(classId, time) > 0){
            return ResponseEntity.ok("Class scheduled time updated");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during class schedule updating");

    }

    public ResponseEntity<String> createClass(GroupFitnessClass group_class){
        try {
            classRepository.save(group_class);
            return ResponseEntity.ok("Created class successfully");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during class creation");
        }
    }

    public ResponseEntity<String> deleteClass(Long classId){
        try {
            List<TakesClass> takesClasses = takesClassRepository.getTakesByClass(classId);
            for(TakesClass t: takesClasses){
                takesClassRepository.delete(t);
            }
            roomRepository.cancelRoomBookedForClass(classId);
            GroupFitnessClass group_class = classRepository.getClassById(classId);
            classRepository.delete(group_class);
            return ResponseEntity.ok("Deleted class successfully");
        }catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred during class deletion");
        }
    }


}
