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
import StraightenIcon from "@mui/icons-material/Straighten";
import DateRangeIcon from "@mui/icons-material/DateRange";

import DecimalInput from "../../../components/DecimalInput";
import React, { useEffect, useState } from "react";
import axios from "axios";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import ScaleIcon from "@mui/icons-material/Scale";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { Height } from "@/components/types";

function GoalsMetrics({ user }: { user: any }) {
  const [userGoal, setUserGoal] = useState<any>("");
  const [editUserGoal, setEditUserGoal] = useState(false);
  const [goalDescription, setGoalDescription] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [targetBodyFat, setTargetBodyFat] = useState("");
  const [targetMuscleMass, setTargetMuscleMass] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");
  const [goalDate, setGoalDate] = useState("");

  const [userMetrics, setUserMetrics] = useState<any>(null);
  const [editUserMetric, setEditUserMetric] = useState(false);
  const [weight, setWeight] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [bodyFat, setBodyFat] = useState<number | null>(null);
  const [muscleMass, setMuscleMass] = useState<number | null>(null);

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
        `http://localhost:8080/healthMetrics/${user.memberID}`
      );
      console.log("metrics", metrics);
      setUserMetrics(metrics.data);
    } catch (error) {
      console.log("Error retrieving user metrics:", error);
    }
  };

  const handleGoalSubmit = async (e: any) => {
    e.preventDefault();

    try {
      if (editUserGoal && userGoal) {
        console.log("Updated existing user goal.");
        await axios.put(`http://localhost:8080/fitnessGoals/updateGoal`, {
          member: user,
          goalID: userGoal.goalID,
          goalDescription,
          goalDate,
          targetWeight,
          targetBodyFat,
          targetMuscleMass,
        });
      } else {
        console.log("Created a new user goal.");
        await axios.post(`http://localhost:8080/fitnessGoals`, {
          member: user,
          goalDescription,
          goalDate,
          targetWeight,
          targetBodyFat,
          targetMuscleMass,
        });
      }
      setResultMessage("Successfully updated goal configurations.");
      setUserGoal({
        member: user,
        goalDescription,
        goalDate,
        targetWeight,
        targetBodyFat,
        targetMuscleMass,
      });
      setOpenResult(true);
      setEditUserGoal(false);
    } catch (error) {
      console.error("Error updating fields name:", error);
      setResultMessage("Failed to set user goals. Please try again.");
      setOpenResult(true);
    }
  };

  const handleMetricSubmit = async (e: any) => {
    e.preventDefault();

    try {
      // update the existing metric
      if (editUserMetric && userMetrics) {
        await axios.put(
          `http://localhost:8080/healthMetrics/${userMetrics.id}/updateMetric`,
          {
            member: user,
            weight,
            height,
            bodyFat,
            muscleMass,
          }
        );
      } else {
        await axios.post(`http://localhost:8080/healthMetrics`, {
          member: user,
          weight,
          height,
          bodyFat,
          muscleMass,
        });
      }

      setResultMessage("Successfully updated metric configurations.");
      setUserMetrics({
        weight,
        height,
        bodyFat,
        muscleMass,
      });
      setEditUserMetric(false);
      setOpenResult(true);
    } catch (error) {
      console.error("Error setting/updating metrics:", error);
      setResultMessage("Failed to set user metrics. Please try again.");
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
            onSubmit={handleGoalSubmit}
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
            {!editUserGoal && userGoal ? (
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

                    <ListItem>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "#f9a826" }}>
                          <DateRangeIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${userGoal.goalDate}`}
                        secondary="Goal Date"
                      />
                    </ListItem>
                  </List>

                  <button
                    type="button"
                    style={{
                      marginTop: "20px",
                      marginLeft: "20px",
                      backgroundColor: "#f9a826",
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
                      setEditUserGoal(true);
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
                      onChange={(e: any) =>
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
                      onChange={(e: any) => {
                        setTargetBodyFat(e);
                      }}
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
                      onChange={(e: any) => setTargetMuscleMass(e)}
                      unit={"%"}
                      sx={{ width: "100px" }}
                    />
                  </div>
                  <div>
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
                    {editUserGoal && (
                      <button
                        type="button"
                        style={{
                          marginTop: "20px",
                          backgroundColor: "#f9a826",
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
                          setEditUserGoal(false);
                        }}
                        disabled={!userGoal}
                      >
                        CANCEL
                      </button>
                    )}

                    <button
                      type="submit"
                      style={{
                        marginTop: "20px",
                        backgroundColor: "#f9a826",
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
          <div style={{ paddingBottom: "20px", maxWidth: "500px" }}>
            View and modify your set health metrics here. Old metrics will be
            used to track your overall fitness journey progress, which is
            displayed in your dashboard.
          </div>
          {userMetrics && !editUserMetric ? (
            <>
              <List
                sx={{
                  width: "100%",
                  maxWidth: 360,
                  bgcolor: "background.paper",
                }}
              >
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#f9a826" }}>
                      <ScaleIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userMetrics.weight} lbs.`}
                    secondary="Current Weight"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#f9a826" }}>
                      <StraightenIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userMetrics.height} cm`}
                    secondary="Current Height"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#f9a826" }}>
                      <AccessibilityIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userMetrics.bodyFat} %`}
                    secondary="Current Body Fat %"
                  />
                </ListItem>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#f9a826" }}>
                      <FitnessCenterIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${userMetrics.muscleMass} %`}
                    secondary="Current Muscle Mass %"
                  />
                </ListItem>
              </List>

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
                    backgroundColor: "#f9a826",
                    color: "white",
                    border: "none",
                    padding: "10px 20px",
                    cursor: "pointer",
                    borderRadius: "15px",
                    fontSize: "15px",
                    fontWeight: "bold",
                    width: "250px",
                  }}
                  onClick={() => {
                    setEditUserMetric(true);
                  }}
                >
                  EDIT CURRENT METRIC
                </button>
                <button
                  type="submit"
                  style={{
                    marginTop: "20px",
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
                  onClick={() => setUserMetrics(null)}
                >
                  ADD NEW METRIC
                </button>
              </div>
            </>
          ) : (
            <>
              <form
                onSubmit={handleMetricSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginBottom: "10px",
                  marginLeft: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                  }}
                >
                  <div
                    style={{
                      paddingBottom: "20px",
                      maxWidth: "400px",
                      fontStyle: "italic",
                    }}
                  >
                    It doesn't seem you have any metrics logged yet. Set your
                    health metrics by clicking the button below.
                  </div>

                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Add your current weight:
                    </div>
                    <DecimalInput
                      value={weight}
                      onChange={(e: any) => setWeight(e)}
                      unit={"lbs."}
                      sx={{ width: "100px" }}
                    />
                  </div>
                  <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                    Add your current height:
                  </div>
                  <DecimalInput
                    value={height}
                    onChange={(e: any) => setHeight(e)}
                    unit={"cm"}
                    sx={{ width: "100px" }}
                  />

                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Add your current body fat percentage:
                    </div>
                    <DecimalInput
                      value={bodyFat}
                      onChange={(e: any) => setBodyFat(e)}
                      unit={"%"}
                      sx={{ width: "100px" }}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
                      Add your current muscle mass percentage:
                    </div>
                    <DecimalInput
                      value={muscleMass}
                      onChange={(e: any) => setMuscleMass(e)}
                      unit={"%"}
                      sx={{ width: "100px" }}
                    />
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      gap: "10px",
                    }}
                  >
                    {editUserMetric && (
                      <button
                        type="submit"
                        style={{
                          marginBottom: "20px",
                          backgroundColor: "#f9a826",
                          color: "white",
                          border: "none",
                          padding: "10px 20px",
                          cursor: "pointer",
                          borderRadius: "15px",
                          fontSize: "15px",
                          fontWeight: "bold",
                          width: "100px",
                        }}
                        onClick={() => setEditUserMetric(false)}
                      >
                        CANCEL
                      </button>
                    )}
                    <button
                      type="submit"
                      style={{
                        marginBottom: "20px",
                        backgroundColor: "#f9a826",
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
                </div>
              </form>
            </>
          )}
        </div>
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
  );
}

export default GoalsMetrics;
