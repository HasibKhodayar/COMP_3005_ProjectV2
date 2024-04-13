import {
  Alert,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { EquipmentCondition } from "../../../components/types";

function EquipmentMaintenance({ user }: { user: any }) {
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [equipment, setEquipment] = useState<any[]>([]);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [updatedEquipment, setUpdatedEquipment] = useState<any>();
  const [equipmentCondition, setEquipmentCondition] = useState<string>("");
  const [rooms, setRooms] = useState<any>();

  // Get all equipment in available rooms
  const getEquipment = async (roomFilter: any) => {
    try {
      let response;
      if (roomFilter) {
        const roomId = roomFilter.split(",")[0];
        response = await axios.get(
          `http://localhost:8080/equipment/${roomId}/getByRoom`
        );
      } else {
        response = await axios.get(`http://localhost:8080/equipment/getAll`);
      }
      console.log("List of equipment available:", response.data);
      setEquipment(response.data);
    } catch (error) {
      console.log("Error retrieving equipment:", error);
    }
  };

  // retrieves all rooms and stores them in a key value pair (room : roomId) to allow for equipment filtering per room
  const getRooms = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/rooms/getAllRooms`
      );
      console.log("List of rooms available:", response.data);

      const roomsMap: { [key: string]: number } = {};
      response.data.forEach((room: any) => {
        roomsMap[room.room.roomName] = room.room.roomId;
      });

      setRooms(roomsMap);
      console.log("rooms have been set to:", roomsMap);
    } catch (error) {
      console.log("Error retrieving rooms:", error);
    }
  };

  const getCondition = (condition: string) => {
    if (condition === EquipmentCondition.EXCELLENT) {
      return "#05b033";
    } else if (condition === EquipmentCondition.GOOD) {
      return "#05b033";
    } else if (condition === EquipmentCondition.FAIR) {
      return "#80b005";
    } else if (condition === EquipmentCondition.POOR) {
      return "#b06005";
    } else if (condition === EquipmentCondition.NEEDS_REPAIR) {
      return "#b02405";
    }
  };

  const updateEquipmentCondition = async () => {
    try {
      const day = new Date().toISOString().split("T")[0];
      console.log("day", day);
      const response = await axios.put(
        `http://localhost:8080/equipment/${updatedEquipment.equipmentId}/${day}/${equipmentCondition}/update`,
        null
      );
      console.log("Equipment has been successfully cancelled:", response.data);
      setResultMessage(
        `Successfully updated condition for equipment ${updatedEquipment.equipmentId}.`
      );
      setOpenDialog(false);
      setOpenResult(true);
      getEquipment(null);
    } catch (error) {
      console.log("Error cancelling equipment:", error);
      setResultMessage(
        `Failed to update condition for equipment ${updatedEquipment.equipmentId}.`
      );
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

    setOpenResult(false);
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

  // get all equipment when the component mounts
  useEffect(() => {
    getEquipment(null);
    getRooms();
  }, []);

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <h1>Equipment Maintanence</h1>
        <Typography>
          Below you may view all available equipment, and filter by room. Here,
          you can manage the condition of the equipment, and mark equipment as
          out of service for maintenance.
        </Typography>
      </div>
      {rooms && Object.keys(rooms).length > 0 ? (
        <>
          <select
            onChange={(e) => {
              getEquipment(e.target.value);
            }}
            style={{
              width: "30%",
              padding: "10px",
              fontSize: "16px",
              marginBottom: "10px",
            }}
          >
            <option value="">Filter by Room</option>
            {Object.entries(rooms).map(([roomName, roomId]) => (
              <option key={String(roomId)} value={`${roomId},${roomName}`}>
                {roomName}
              </option>
            ))}
          </select>
        </>
      ) : (
        "Loading rooms..."
      )}

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {equipment.length > 0 ? (
          equipment.map((equipment, index) => {
            return (
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h6">
                    {equipment.equipmentName}
                  </Typography>

                  <Typography gutterBottom color="text.secondary">
                    <b>Last maintenance on: </b>
                    {equipment.lastMaintenanceDate}
                  </Typography>
                  <Typography gutterBottom color="text.secondary">
                    <b>Room location:</b> {equipment.room.roomName}
                  </Typography>
                  <Chip
                    label={equipment.eqCondition.toUpperCase()}
                    sx={{
                      margin: "5px",
                      bgcolor: getCondition(equipment.eqCondition),
                    }}
                  />
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: "#f9a826" }}
                    onClick={() => {
                      setUpdatedEquipment(equipment);
                      console.log("equipment", equipment);
                      setOpenDialog(true);
                    }}
                  >
                    UPDATE CONDITION
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary">
            No equipment available, please contact admins.
          </Typography>
        )}
      </div>

      {/* Dialog for updating equipment condition */}
      <Dialog open={openDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {`Update Equipment Condition for ${
            updatedEquipment?.equipmentName ?? ""
          }`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Select an updated condition for the equipment. Press cancel to exit,
            and save to save the new condition.
          </DialogContentText>

          <select
            onChange={(e) => setEquipmentCondition(e.target.value)}
            style={{ width: "100%", padding: "10px" }}
          >
            <option value="">Select Equipment Condition</option>
            {Object.values(EquipmentCondition).map((condition, index) => (
              <option key={index} value={condition}>
                {condition}
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
            onClick={updateEquipmentCondition}
            autoFocus
            sx={{ bgcolor: "#f9a826", color: "white" }}
            disabled={!equipmentCondition}
          >
            UPDATE
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

export default EquipmentMaintenance;
