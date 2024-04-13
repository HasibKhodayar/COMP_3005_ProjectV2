package com.example.HealthFitnessClubManagement.controller;

import com.example.HealthFitnessClubManagement.model.Equipment;
import com.example.HealthFitnessClubManagement.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Date;
import java.util.List;

@RestController
@RequestMapping("/equipment")
public class EquipmentController {

    @Autowired
    private EquipmentService equipmentService;

    @GetMapping("/getAll")
    public ResponseEntity<List<Equipment>> getAllEquipment(){
        return new ResponseEntity<>(equipmentService.getAllEquipment(), HttpStatus.OK);
    }

    @GetMapping("/{roomId}/getByRoom")
    public ResponseEntity<List<Equipment>> getEquipmentByRoom(@PathVariable Long roomId){
        return new ResponseEntity<>(equipmentService.getEquipmentByRoom(roomId), HttpStatus.OK);
    }

    @PutMapping("/{equipmentId}/{day}/{condition}/update")
    public ResponseEntity<String> updateEquipment(@PathVariable Long equipmentId, @PathVariable Date day, @PathVariable String condition){
        return equipmentService.updateEquipment(equipmentId,day,condition);
    }
}
