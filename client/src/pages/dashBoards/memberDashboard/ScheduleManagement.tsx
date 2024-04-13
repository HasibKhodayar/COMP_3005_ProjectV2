import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";

function ScheduleManagement({ user }: { user: any }) {
  const [availableTrainers, setAvailableTrainers] = useState<any[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<any>();
  const [availableDays, setAvailableDays] = useState<any[]>([]);
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [memberBookedSessions, setMemberBookedSessions] = useState<any[]>([]);

  const getBookedSessions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/availability/${user.memberID}/getSessions`
      );
      console.log("List of booked sessions:", response.data);
      setMemberBookedSessions(response.data);
    } catch (error) {
      console.log("Error retrieving booked sessions:", error);
    }
  };

  const getAvailableTrainers = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/availability/getAvailableTrainers`
      );
      console.log("List of available trainers:", response.data);
      setAvailableTrainers(response.data);
    } catch (error) {
      console.log("Error retrieving available trainers:", error);
    }
  };

  const handleSelectTrainer = async (trainer: any) => {
    setSelectedTrainer(trainer);
    try {
      const response = await axios.get(
        `http://localhost:8080/availability/${trainer.memberID}/getAvailableDays`
      );
      console.log("List of available days for trainer:", response.data);
      setAvailableDays(response.data);
    } catch (error) {
      console.log("Error retrieving available days for trainer:", error);
    }
  };

  const handleDayClicked = async (day: any) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/availability/${day.availabilityID}/getAvailableTimes`
      );
      console.log("List of available times for trainer day:", response.data);
      setAvailableTimes(response.data);
    } catch (error) {
      console.log("Error retrieving available times for trainer day:", error);
    }
  };

  const handleBookSession = async (day: string, time: string) => {
    // implement booking session
    try {
      await axios.put(
        `http://localhost:8080/availability/${user.memberID}/${selectedTrainer.memberID}/${day}/${time}/bookSession`,
        null
      );
      getAvailableTrainers();
      setExpandedAccordion(false);
      console.log("Successfully booked session");
      getBookedSessions();
    } catch (error) {
      console.log("Error booking session:", error);
    }
  };

  const deleteSession = async (sessionID: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/availability/${sessionID}/cancelSession`
      );
      console.log("Successfully cancelled session");
      getBookedSessions();
    } catch (error) {
      console.log("Error deleting session:", error);
    }
  };

  useEffect(() => {
    getAvailableTrainers();
    getBookedSessions();
  }, []);

  return (
    <div>
      <Typography variant="h4">
        Schedule Management
        <Typography>
          This is where you can book sessions with a trainer. You can also view
          past sessions and cancel upcoming sessions.
        </Typography>
      </Typography>
      <Divider style={{ margin: "20px" }} />
      <Typography variant="h5">Available Trainers</Typography>
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {availableTrainers.map((trainer) => (
          <ListItem key={trainer.trainerID}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#f9a826" }}>
                <AccountBoxIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${trainer.firstName} ${trainer.lastName}`}
            />
            <div>
              <Button
                variant="contained"
                sx={{ bgcolor: "#f9a826", color: "white" }}
                onClick={() => handleSelectTrainer(trainer)}
              >
                Book
              </Button>
            </div>
          </ListItem>
        ))}
      </List>

      {selectedTrainer && availableDays.length > 0 && (
        <>
          <Typography
            variant="h5"
            style={{ paddingTop: "30px", paddingBottom: "20px" }}
          >
            Available Sessions with {selectedTrainer.firstName}
            <Typography>
              {selectedTrainer.firstName}'s availability is listed below. Please
              book a session based on the times listed below. If these times do
              not match your schedule, select another available trainer.
            </Typography>
            <Alert severity="info" style={{ margin: "5px" }}>
              <b>Note:</b> Each training session is 1 hr. long
            </Alert>
          </Typography>

          {availableDays.map((day, index) => (
            <div key={index}>
              <Accordion
                style={{ marginBottom: "10px" }}
                onChange={() => handleDayClicked(day)}
                expanded={expandedAccordion}
              >
                <AccordionSummary
                  expandIcon={<ArrowDownwardIcon />}
                  onClick={() => setExpandedAccordion(!expandedAccordion)}
                  aria-controls="panel1-content"
                  id="panel1-header"
                >
                  <Typography>{day.dayAvailable}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>
                    {availableTimes && availableTimes.length > 0 && (
                      <Typography>
                        {availableTimes.map((time, index) => (
                          <div key={index}>
                            <Button
                              variant="contained"
                              sx={{
                                bgcolor: "#f9a826",
                                color: "white",
                                width: "100px",
                                margin: "5px",
                              }}
                              onClick={() =>
                                handleBookSession(day.dayAvailable, time)
                              }
                            >
                              {time}
                            </Button>
                          </div>
                        ))}
                      </Typography>
                    )}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </>
      )}

      <Typography
        variant="h5"
        style={{ paddingTop: "30px", paddingBottom: "20px" }}
      >
        Your Booked Sessions
        <Typography>
          Below you can view successfully booked sessions. Cancel any upcoming
          session by clicking the red button next to it.
        </Typography>
      </Typography>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "5px",
        }}
      >
        {memberBookedSessions && memberBookedSessions.length > 0 ? (
          memberBookedSessions.map((session, index) => (
            <Card sx={{ minWidth: 275 }} key={index}>
              <CardContent>
                <Typography variant="h6">Booking Details</Typography>

                <Typography gutterBottom color="text.secondary">
                  <b>Scheduled Date:</b> {session.scheduledDate}
                </Typography>
                <Typography gutterBottom color="text.secondary">
                  <b>Scheduled Time:</b> {session.scheduledTime}
                </Typography>
                <Typography gutterBottom color="text.secondary">
                  <b>Trainer:</b> {session.trainer.firstName}{" "}
                  {session.trainer.lastName}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  sx={{ color: "#f9a826" }}
                  onClick={() => deleteSession(session.sessionId)}
                >
                  DELETE
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No booked sessions found.
          </Typography>
        )}
      </div>
    </div>
  );
}

export default ScheduleManagement;
