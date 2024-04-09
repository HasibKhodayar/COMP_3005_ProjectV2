import CloseIcon from "@mui/icons-material/Close";
import {
  Avatar,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Snackbar,
  TextField,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import DecimalInput from "../../../components/DecimalInput";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScaleIcon from "@mui/icons-material/Scale";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";

function GoalsMetrics({ user }: { user: any }) {
  const [userGoal, setUserGoal] = useState<any>("");
  const [savedUserGoal, setSavedUserGoal] = useState<any>("");
  const [userMetrics, setUserMetrics] = useState<any>(null);
  const [goalDescription, setGoalDescription] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [targetBodyFat, setTargetBodyFat] = useState("");
  const [targetMuscleMass, setTargetMuscleMass] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [goalDate, setGoalDate] = useState("");

  const getGoals = async () => {
    try {
      const fitnessGoal = await axios.get(
        `http://localhost:8080/fitnessGoals/${user.memberID}`
      );
      console.log("fitnessGoal", fitnessGoal);
      setUserGoal(fitnessGoal.data);
    } catch (error) {
      console.log("Error retrieving fitness goals:", error);
    }
  };

  const getMetrics = async () => {
    try {
      const metrics = await axios.get(
        `http://localhost:8080/members/${user.id}/getMetrics`
      );
      console.log("metrics", metrics);
      setUserMetrics(metrics);
    } catch (error) {
      console.log("Error retrieving user metrics:", error);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("handling submit");
    try {
      if (!userGoal) {
        await axios.post(
          `http://localhost:8080/fitnessGoals/${user.memberID}/createGoal`,
          {
            member: user,
            goalDescription,
            goalDate,
            targetWeight,
            targetBodyFat,
            targetMuscleMass,
          }
        );
      } else {
        await axios.put(
          `http://localhost:8080/goals/${user.memberID}/updateGoal`,
          {
            member: user,
            goalDescription,
            goalDate,
            targetWeight,
            targetBodyFat,
            targetMuscleMass,
          }
        );
      }
      setResultMessage("Successfully updated profile configurations.");
      setOpenResult(true);
    } catch (error) {
      console.error("Error updating fields name:", error);
      alert("Failed to update fields. Please try again.");
      setResultMessage(
        "Failed to update profile configurations. Please try again."
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

  useEffect(() => {
    const fetchData = async () => {
      await getGoals();
      await getMetrics();
    };

    fetchData();
  }, []);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        border: "3px solid #f9a826",
        borderRadius: "20px",
        padding: "20px",
        paddingLeft: "50px",
      }}
    >
      <div>
        <h1>Fitness Goals</h1>

        <div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              marginLeft: "20px",
            }}
          >
            <div style={{ paddingBottom: "20px" }}>
              View and modify your set fitness goals here.
            </div>
            {userGoal ? (
              <>
                <>
                  <List
                    sx={{
                      width: "100%",
                      maxWidth: 360,
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <b>Your goal</b>
                      {` : ${userGoal.goalDescription}`}
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#f9a826" }}>
                          <ScaleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${userGoal.targetWeight} lbs.`}
                        secondary="Target Weight"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#f9a826" }}>
                          <AccessibilityIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${userGoal.targetBodyFat} %`}
                        secondary="Target Body Fat %"
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#f9a826" }}>
                          <FitnessCenterIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${userGoal.targetMuscleMass} %`}
                        secondary="Target Muscle Mass %"
                      />
                    </ListItem>
                  </List>

                  <button
                    type="button"
                    style={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      backgroundColor: "#F9A826",
                      color: "white",
                      border: "none",
                      padding: "10px 20px",
                      cursor: "pointer",
                      borderRadius: "15px",
                      fontSize: "15px",
                      fontWeight: "bold",
                      width: "100px",
                    }}
                    onClick={() => {
                      setSavedUserGoal(userGoal);
                      setUserGoal(null);
                    }}
                  >
                    EDIT
                  </button>
                </>
              </>
            ) : (
              <>
                <div
                  style={{
                    paddingBottom: "20px",
                    maxWidth: "400px",
                    fontStyle: "italic",
                  }}
                >
                  It doesn't seem you have any fitness goals set yet. Set your
                  goals by clicking the button below.
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Describe your goal:
                    </div>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      sx={{ width: "400px" }}
                      maxRows={4}
                      value={goalDescription}
                      onChange={(e) =>
                        setGoalDescription((prev) => e.target.value)
                      }
                    />
                  </div>

                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Add your targeted weight:
                    </div>
                    <DecimalInput
                      value={targetWeight}
                      onChange={setTargetWeight}
                      unit={"lbs."}
                      sx={{ width: "100px" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Add your targeted body fat percentage:
                    </div>
                    <DecimalInput
                      value={targetBodyFat}
                      onChange={setTargetBodyFat}
                      unit={"%"}
                      sx={{ width: "100px" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Add your targeted muscle mass percentage:
                    </div>
                    <DecimalInput
                      value={targetMuscleMass}
                      onChange={setTargetMuscleMass}
                      unit={"%"}
                      sx={{ width: "100px" }}
                    />
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      What date would you like to achieve this goal by?
                    </div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        label="MM/DD/YYYY"
                        onChange={(date) =>
                          setGoalDate(dayjs(date).format("YYYY-MM-DD"))
                        }
                      />
                    </LocalizationProvider>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    <button
                      type="button"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#F9A826",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "15px",
                        fontSize: "15px",
                        fontWeight: "bold",
                        width: "100px",
                      }}
                      onClick={() => {
                        setUserGoal(savedUserGoal);
                      }}
                    >
                      CANCEL
                    </button>
                    <button
                      type="submit"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#F9A826",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        cursor: "pointer",
                        borderRadius: "15px",
                        fontSize: "15px",
                        fontWeight: "bold",
                        width: "100px",
                      }}
                    >
                      SAVE
                    </button>
                  </div>
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
                </div>
              </>
            )}
          </form>
        </div>
      </div>

      <div>
        <h1>Health Metrics</h1>

        <div>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              marginLeft: "20px",
            }}
          >
            <div style={{ paddingBottom: "20px", maxWidth: "500px" }}>
              View and modify your set health metrics here. Old metrics will be
              used to track your overall fitness journey progress, which is
              displayed in your dashboard.
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              <div>
                <div style={{ fontSize: "18px" }}>First name:</div>
              </div>

              <button
                type="submit"
                style={{
                  marginBottom: "20px",
                  backgroundColor: "#F9A826",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  cursor: "pointer",
                  borderRadius: "15px",
                  fontSize: "15px",
                  fontWeight: "bold",
                  width: "100px",
                }}
              >
                Save
              </button>
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
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default GoalsMetrics;
