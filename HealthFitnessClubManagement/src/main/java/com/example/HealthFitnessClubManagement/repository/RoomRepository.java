package com.example.HealthFitnessClubManagement.repository;

import com.example.HealthFitnessClubManagement.model.GroupFitnessClass;
import com.example.HealthFitnessClubManagement.model.Room;
import com.example.HealthFitnessClubManagement.model.RoomWithBookedStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    @Query("SELECT r FROM Room r JOIN GroupFitnessClass c ON c.room.roomId = r.roomId WHERE c.classID = :classId")
    Room getRoomAssociatedWithClass(Long classId);


    @Query("SELECT r FROM Room r LEFT OUTER JOIN GroupFitnessClass c ON c.room.roomId = r.roomId WHERE c.room.roomId IS NULL")
    List<Room> getAvailableRooms();


    @Query("SELECT NEW com.example.HealthFitnessClubManagement.model.RoomWithBookedStatus(r, CASE WHEN c.classID IS NULL THEN false ELSE true END, c.className) FROM Room r LEFT OUTER JOIN GroupFitnessClass c ON c.room.roomId = r.roomId")
    public List<RoomWithBookedStatus> getAllRoomsWithBookingStatus();


    @Modifying
    @Transactional
    @Query("UPDATE GroupFitnessClass c SET c.room.roomId = :roomId WHERE c.classID = :classId")
    int updateRoomBooking(Long roomId, Long classId);


    @Modifying
    @Transactional
    @Query("UPDATE GroupFitnessClass c SET c.room.roomId = NULL WHERE c.classID = :classId")
    int cancelRoomBookedForClass(Long classId);


    @Query("SELECT c FROM GroupFitnessClass c WHERE c.room.roomId =:roomId")
    GroupFitnessClass getClassIdByRoomId(Long roomId);

}
