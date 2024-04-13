package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.Equipment;
import lombok.Data;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.util.List;

@Repository
public interface EquipmentRepository extends JpaRepository<Equipment, Long>{

    @Query("SELECT e FROM Equipment e")
    List<Equipment> getAllEquipment();

    @Query("SELECT e FROM Equipment e WHERE e.room.roomId =:roomId")
    List<Equipment> getEquipmentByRoom(Long roomId);


    @Modifying
    @Transactional
    @Query("UPDATE Equipment e SET e.lastMaintenanceDate =:newDate, e.eqCondition =:condition WHERE e.equipmentId =:equipmentId")
    int updateEquipment(Long equipmentId, Date newDate, String condition);


}
