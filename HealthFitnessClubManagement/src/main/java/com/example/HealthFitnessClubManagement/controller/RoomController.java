package com.example.HealthFitnessClubManagement.controller;


import com.example.HealthFitnessClubManagement.model.Room;
import com.example.HealthFitnessClubManagement.model.RoomWithBookedStatus;
import com.example.HealthFitnessClubManagement.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/rooms")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/getAllRooms")
    public ResponseEntity<List<RoomWithBookedStatus>> getAllRooms(){
        return new ResponseEntity<>(roomService.getAllRooms(), HttpStatus.OK);
    }

    @PutMapping("/{roomId}/{classId}/updateRoomBooking")
    public ResponseEntity<String> updateRoomBooking(@PathVariable Long roomId, @PathVariable Long classId){
        return roomService.updateRoomBooking(roomId,classId);
    }

    @PutMapping("/{roomId}/cancelRoomBooking")
    public ResponseEntity<String> cancelRoomBooking(@PathVariable Long roomId){
        return roomService.cancelRoomBooking(roomId);
    }
}
