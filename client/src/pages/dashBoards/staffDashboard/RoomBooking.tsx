import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  Chip,
  Divider,
  IconButton,
  Alert,
  Snackbar,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { EquipmentCondition } from "@/components/types";

function RoomBooking({ user }: { user: any }) {
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [rooms, setRooms] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [fitnessClasses, setFitnessClasses] = useState<any>({});
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedRoomId, setSelectedRoomId] = useState("");

  // retrieves all available rooms at FitnessTrackr
  const getRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/getAllRooms`
      );
      console.log("List of rooms available:", response.data);
      setRooms(response.data);
    } catch (error) {
      console.log("Error retrieving rooms:", error);
    }
  };

  // gets all the fitness classes and puts them in a key:value pair state, where key is the class name and value is the class ID
  const getFitnessClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/groupClasses/getAllClasses`
      );
      console.log("List of classes available:", response.data);

      const classesKeyValue = response.data.reduce(
        (acc: any, classItem: any) => {
          if (classItem.room === null) {
            acc[classItem.className] = classItem.classID;
          }
          return acc;
        },
        {}
      );
      console.log("classesKeyValue", classesKeyValue);
      setFitnessClasses(classesKeyValue);
    } catch (error) {
      console.log("Error retrieving classes:", error);
    }
  };

  const assignRoom = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/rooms/${selectedRoomId}/${selectedClass}/updateRoomBooking`
      );
      console.log("Room has been successfully assigned:", response.data);
      setResultMessage(`Successfully assigned room to class.`);
      setOpenResult(true);
      getFitnessClasses();
      setOpenDialog(false);
      getRooms();
    } catch (error) {
      console.log("Error assigning room:", error);
      setResultMessage(`Failed to assign room to class.`);
      setOpenResult(true);
    }
  };

  // cancels all room bookings for a specific room
  const cancelRoom = async (roomId: number) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/rooms/${roomId}/cancelRoomBooking`,
        null
      );
      console.log("Room has been successfully cancelled:", response.data);
      setResultMessage(
        `Successfully cancelled all bookings for room ${roomId}.`
      );
      setOpenResult(true);
      getFitnessClasses();
      getRooms();
    } catch (error) {
      console.log("Error cancelling room:", error);
      setResultMessage(`Failed to cancel bookings for room ${roomId}.`);
      setOpenResult(true);
    }
  };

  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  // on page initial render, the following will be called
  useEffect(() => {
    getRooms();
    getFitnessClasses();
  }, []);

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <h1>Room Booking</h1>
        <Typography>
          Listed below are all the available rooms for the day. As a staff
          member, it is your responsibility to ensure that all rooms are
          available for use, and to manage any conflicts. If a room is
          unavailable, please set it as unavailable.
        </Typography>

        <Alert severity="warning" style={{ margin: "5px" }}>
          <b>Note:</b> Cancelling a room will also cancel any classes being held
          in that room for the week.
        </Alert>
      </div>

      <Divider style={{ marginBottom: "20px" }} />
      <div style={{ paddingLeft: "20px" }}>
        <Typography
          variant="h5"
          style={{ paddingTop: "30px", paddingBottom: "20px" }}
        >
          Rooms
        </Typography>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: "5px",
          }}
        >
          {rooms.length > 0 ? (
            rooms.map((roomDetails, index) => {
              return (
                <Card sx={{ minWidth: 275 }} key={index}>
                  <CardContent>
                    <Typography variant="h6">
                      {roomDetails.room.roomName}
                    </Typography>

                    <Typography gutterBottom color="text.secondary">
                      <b>Class:</b>{" "}
                      {roomDetails.className === "" ||
                      roomDetails.className === null
                        ? "N/A"
                        : roomDetails.className}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Capacity:</b> {roomDetails.room.capacity}
                    </Typography>
                    <Chip
                      label={roomDetails.booked ? "BOOKED" : "AVAILABLE"}
                      sx={{
                        margin: "5px",
                        bgcolor: roomDetails.booked ? "#f9a826" : "green",
                        color: "white",
                      }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      sx={{ color: "#f9a826" }}
                      onClick={() => {
                        setSelectedRoomId(roomDetails.room.roomId);
                        setOpenDialog(true);
                      }}
                    >
                      BOOK CLASS
                    </Button>
                    <Button
                      size="small"
                      sx={{ color: "#f9a826" }}
                      onClick={() => cancelRoom(roomDetails.room.roomId)}
                    >
                      CANCEL BOOKINGS
                    </Button>
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              No rooms available, please contact admins.
            </Typography>
          )}
        </div>
      </div>

      {/* Dialog for booking a class to a specific room */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {`Assign room to a Fitness Class`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select a fitness group class to assign to this room. Please keep in
            mind any potential conflicts.
          </DialogContentText>

          <select
            onChange={(e) => setSelectedClass(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select Fitness Group Class</option>
            {Object.entries(fitnessClasses).map(([className, classID]) => (
              <option key={String(classID)} value={String(classID)}>
                {className}
              </option>
            ))}
          </select>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenDialog(false)}
            sx={{ color: "#f9a826" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={assignRoom}
            autoFocus
            sx={{ bgcolor: "#f9a826", color: "white" }}
            disabled={!selectedClass}
          >
            BOOK
          </Button>
        </DialogActions>
      </Dialog>

      <div style={{ display: "flex", justifyItems: "center" }}>
        <Snackbar
          open={openResult}
          autoHideDuration={3000}
          onClose={handleClose}
          message={resultMessage}
          action={action}
          sx={{
            justifyContent: "center",
          }}
        />
      </div>
    </>
  );
}

export default RoomBooking;
