package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.Equipment;
import com.example.HealthFitnessClubManagement.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.sql.Date;
import java.util.List;

@Service
public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    public List<Equipment> getAllEquipment(){
        return equipmentRepository.getAllEquipment();
    }

    public List<Equipment> getEquipmentByRoom(Long roomId){
        return equipmentRepository.getEquipmentByRoom(roomId);
    }

    public ResponseEntity<String> updateEquipment(Long equipmentId, Date day, String condition){
        if(equipmentRepository.updateEquipment(equipmentId,day,condition) > 0){
            return ResponseEntity.ok("Equipment updated");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating equipment");
    }


}
