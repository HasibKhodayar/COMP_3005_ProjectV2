package com.example.HealthFitnessClubManagement.service;

import com.example.HealthFitnessClubManagement.model.GroupFitnessClass;
import com.example.HealthFitnessClubManagement.model.Room;
import com.example.HealthFitnessClubManagement.model.RoomWithBookedStatus;
import com.example.HealthFitnessClubManagement.repository.GroupClassRepository;
import com.example.HealthFitnessClubManagement.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private GroupClassRepository classRepository;

    public List<RoomWithBookedStatus> getAllRooms(){
        return roomRepository.getAllRoomsWithBookingStatus();
    }

    public Room getRoom(Long roomId) {
        return roomRepository.getRoomByRoomId(roomId);
    }
    public ResponseEntity<String> updateRoomBooking(Long roomId, Long classId){

        this.cancelRoomBooking(roomId);

        if(roomRepository.updateRoomBooking(roomId, classId) > 0){
            return ResponseEntity.ok("Booked room for class successfully");
        }
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while booking the room for class");
    }
    public ResponseEntity<String> cancelRoomBooking(Long roomId){
        GroupFitnessClass g_class = roomRepository.getClassIdByRoomId(roomId);

        if(g_class != null) {
            if (roomRepository.cancelRoomBookedForClass(g_class.getClassID()) > 0) {
                return ResponseEntity.ok("Canceled room booking for class successfully");
            }
        }
        return ResponseEntity.ok("Room is not booked.");
    }
}
