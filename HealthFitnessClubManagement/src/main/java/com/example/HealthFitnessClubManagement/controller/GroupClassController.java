package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.GroupFitnessClass;
import com.example.HealthFitnessClubManagement.model.Member;
import com.example.HealthFitnessClubManagement.service.GroupClassService;
import com.example.HealthFitnessClubManagement.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/groupClasses")
public class GroupClassController {

    @Autowired
    private GroupClassService classService;

    @Autowired MemberService memberService;

    @PostMapping("/{memberId}/{classId}/register")
    public ResponseEntity<String> registerUserForClass(@PathVariable Long memberId, @PathVariable Long classId) {
        return classService.registerForClass(memberService.getMemberById(memberId),
                classService.getClassById(classId));
    }

    @DeleteMapping("/{memberId}/{classId}/unRegister")
    public ResponseEntity<String> unRegisterUserForClass(@PathVariable Long memberId, @PathVariable Long classId) {
        return classService.unRegisterForClass(memberId, classId);
    }


    @GetMapping("/getAllClasses")
    public ResponseEntity<List<GroupFitnessClass>> getAllClasses() {
        List<GroupFitnessClass> classList = classService.getAllCLasses();
        return new ResponseEntity<>(classList, HttpStatus.OK);
    }

    @GetMapping("/{memberId}/getClasses")
    public ResponseEntity<List<GroupFitnessClass>> getClassesByMember(@PathVariable Long memberId) {
        List<GroupFitnessClass> classList = classService.getClassesByMember(memberId);
        return new ResponseEntity<>(classList, HttpStatus.OK);
    }

    @PutMapping("/{classId}/{day}/updateClassDay")
    public ResponseEntity<String> updateClassDay(@PathVariable Long classId, @PathVariable String day){
        return classService.updateClassDay(classId, day);
    }

    @PutMapping("/{classId}/{time}/updateClassTime")
    public ResponseEntity<String> updateClassTime(@PathVariable Long classId, @PathVariable String time){
        return classService.updateClassTime(classId, time);
    }

    @PostMapping("/createClass")
    public ResponseEntity<String> createClass(@RequestBody GroupFitnessClass g_class){
        return classService.createClass(g_class);
    }

    @DeleteMapping("/{classId}/deleteClass")
    public ResponseEntity<String> deleteClass(@PathVariable Long classId){
        return classService.deleteClass(classId);
    }

}
