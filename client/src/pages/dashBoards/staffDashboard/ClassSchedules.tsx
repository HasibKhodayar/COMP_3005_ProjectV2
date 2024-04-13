import {
  Button,
  Card,
  CardActions,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { EquipmentCondition } from "@/components/types";

function ClassSchedules({ user }: { user: any }) {
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [fitnessClasses, setFitnessClasses] = useState<any[]>([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [newFitnessClass, setNewFitnessClass] = useState<any>({});
  const [rooms, setRooms] = useState<any>();
  const [className, setClassName] = useState<string>("");
  const [scheduledDate, setScheduledDate] = useState<string>("");
  const [scheduledTime, setScheduledTime] = useState<string>("");
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [updatedDate, setUpdatedDate] = useState<string>("");
  const [updatedTime, setUpdatedTime] = useState<string>("");
  const [classId, setClassId] = useState<number>(0);

  // Get all fitness classes
  const getFitnessClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/groupClasses/getAllClasses`
      );
      console.log("List of fitness classes available:", response.data);
      setFitnessClasses(response.data);
    } catch (error) {
      console.log("Error retrieving fitness classes:", error);
    }
  };

  // create a new fitness class
  const createFitnessClass = async () => {
    try {
      await axios.post(`http://localhost:8080/groupClasses/createClass`, {
        className,
        scheduledDate,
        scheduledTime,
        numberMembers: 0,
      });
      console.log(className, scheduledDate, scheduledTime);
      console.log("Fitness class created successfully");
      setResultMessage("Fitness class created successfully");
      setOpenResult(true);
      setOpenCreateDialog(false);
      getFitnessClasses();
    } catch (error) {
      console.log("Error creating fitness class:", error);
      setResultMessage("Error creating fitness class.");
      setOpenResult(true);
    }
  };
  // update a fitness class
  const updateFitnessClass = async () => {
    try {
      await axios.put(
        `http://localhost:8080/groupClasses/${classId}/${updatedTime}/updateClassTime`,
        null
      );
      await axios.put(
        `http://localhost:8080/groupClasses/${classId}/${updatedDate}/updateClassDay`,
        null
      );
      console.log("Fitness class updated successfully");
      setResultMessage("Fitness class updated successfully");
      setOpenResult(true);
      setOpenUpdateDialog(false);
      getFitnessClasses();
    } catch (error) {
      console.log("Error updating fitness class:", error);
      setResultMessage("Error updating fitness class.");
      setOpenResult(true);
    }
  };

  // delete a fitness class
  const deleteFitnessClass = async (fitnessClassId: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/groupClasses/${fitnessClassId}/deleteClass`
      );
      console.log("Fitness class deleted successfully");
      setResultMessage("Fitness class deleted successfully");
      setOpenResult(true);
      getFitnessClasses();
    } catch (error) {
      console.log("Error deleting fitness class:", error);
      setResultMessage("Error deleting fitness class.");
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

    setOpenCreateDialog(false);
    setOpenUpdateDialog(false);
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

  useEffect(() => {
    getFitnessClasses();
  }, []);

  return (
    <>
      <div style={{ paddingBottom: "20px" }}>
        <h1>Group Fitness Class Management</h1>
        <Typography>
          Below you may view all available group fitness classes. Here, you can
          edit class schedules, add new classes, and remove classes. This page
          allows you to view and manage all group fitness classes. If you want
          to add a new class, click the "Add New Class" button.
        </Typography>
      </div>

      <Divider style={{ margin: "10px" }} />

      <Typography variant="h5" sx={{ paddingBottom: "10px" }}>
        Current Group Fitness Classes
      </Typography>

      <button
        type="button"
        style={{
          marginTop: "20px",
          marginBottom: "20px",
          backgroundColor: "#f9a826",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "15px",
          fontSize: "15px",
          fontWeight: "bold",
          width: "200px",
        }}
        onClick={() => {
          setOpenCreateDialog(true);
        }}
      >
        CREATE NEW CLASS
      </button>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {fitnessClasses.length > 0 ? (
          fitnessClasses.map((fitnessClass, index) => {
            const classCancelled = fitnessClass.room === null;

            return (
              <Card sx={{ minWidth: 275 }} key={index}>
                <CardContent>
                  <Typography variant="h6">{fitnessClass.className}</Typography>
                  <Typography gutterBottom color="text.secondary">
                    <b>Scheduled Day:</b> {fitnessClass.scheduledDate}
                  </Typography>

                  <Typography gutterBottom color="text.secondary">
                    <b>Scheduled Time:</b> {fitnessClass.scheduledTime}
                  </Typography>
                  <Typography gutterBottom color="text.secondary">
                    <b>Room:</b> {fitnessClass.room?.roomName ?? "N/A"}
                  </Typography>
                  <Typography gutterBottom color="text.secondary">
                    <b>Number of Members:</b> {fitnessClass.numberMembers}
                  </Typography>
                </CardContent>
                <CardActions>
                  {fitnessClass.numberMembers ===
                  fitnessClass.room?.capacity ? (
                    <Button size="small" color="error" disabled>
                      CLASS FULL
                    </Button>
                  ) : (
                    <Button
                      size="small"
                      sx={{ color: "#f9a826" }}
                      onClick={() => {
                        setClassId(fitnessClass.classID);
                        setUpdatedDate(fitnessClass.scheduledDate);
                        setUpdatedTime(fitnessClass.scheduledTime);
                        setOpenUpdateDialog(true);
                      }}
                    >
                      UPDATE
                    </Button>
                  )}
                  <Button
                    size="small"
                    sx={{ color: "#f9a826" }}
                    onClick={() => deleteFitnessClass(fitnessClass.classID)}
                  >
                    DELETE
                  </Button>
                </CardActions>
              </Card>
            );
          })
        ) : (
          <Typography variant="body2" color="text.secondary">
            No fitness classes available.
          </Typography>
        )}
      </div>

      {/* Dialog for creating new fitness class */}
      <Dialog open={openCreateDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Create a new fitness class"}
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <DialogContentText id="alert-dialog-description">
            Here, you can specify the details for the new fitness class. Please
            fill out all fields to create the class.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="class-name"
            label="Class Name"
            fullWidth
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id="scheduled-day-label">Scheduled Day</InputLabel>
            <Select
              labelId="scheduled-day-label"
              id="scheduled-day"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            id="scheduled-time"
            label="Scheduled Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenCreateDialog(false)}
            sx={{ color: "#f9a826" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={createFitnessClass}
            autoFocus
            sx={{ bgcolor: "#f9a826", color: "white" }}
            disabled={!className || !scheduledDate || !scheduledTime}
          >
            CREATE
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for updating an existing fitness class */}
      <Dialog open={openUpdateDialog} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {"Create a new fitness class"}
        </DialogTitle>
        <DialogContent
          style={{ display: "flex", flexDirection: "column", gap: "5px" }}
        >
          <DialogContentText id="alert-dialog-description">
            Here, you can specify the details for the new fitness class. Please
            fill out all fields to create the class.
          </DialogContentText>

          <FormControl fullWidth>
            <InputLabel id="updated-day-label">
              Updated Scheduled Day
            </InputLabel>
            <Select
              labelId="updated-day-label"
              id="updated-day"
              value={updatedDate}
              onChange={(e) => setUpdatedDate(e.target.value)}
            >
              <MenuItem value="Monday">Monday</MenuItem>
              <MenuItem value="Tuesday">Tuesday</MenuItem>
              <MenuItem value="Wednesday">Wednesday</MenuItem>
              <MenuItem value="Thursday">Thursday</MenuItem>
              <MenuItem value="Friday">Friday</MenuItem>
              <MenuItem value="Saturday">Saturday</MenuItem>
              <MenuItem value="Sunday">Sunday</MenuItem>
            </Select>
          </FormControl>

          <TextField
            margin="dense"
            id="scheduled-time"
            label="Scheduled Time"
            type="time"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={updatedTime}
            onChange={(e) => setUpdatedTime(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setOpenUpdateDialog(false)}
            sx={{ color: "#f9a826" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={updateFitnessClass}
            autoFocus
            sx={{ bgcolor: "#f9a826", color: "white" }}
            disabled={!updatedTime || !updatedDate}
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

export default ClassSchedules;
