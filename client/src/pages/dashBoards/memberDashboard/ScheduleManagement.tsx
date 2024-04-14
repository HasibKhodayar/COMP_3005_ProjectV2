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
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  TextField,
} from "@mui/material";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";

import React, { useState, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { PurchaseType, ChargeType } from "../../../components/types";

function ScheduleManagement({ user }: { user: any }) {
  const [availableTrainers, setAvailableTrainers] = useState<any[]>([]);
  const [selectedTrainer, setSelectedTrainer] = useState<any>();
  const [availableDays, setAvailableDays] = useState<any[]>([]);
  const [availableTimes, setAvailableTimes] = useState<any[]>([]);
  const [expandedAccordion, setExpandedAccordion] = useState(false);
  const [memberBookedSessions, setMemberBookedSessions] = useState<any[]>([]);
  const [fitnessClasses, setFitnessClasses] = useState<any[]>([]);
  const [bookedFitnessClasses, setBookedFitnessClasses] = useState<any[]>([]);
  const [bookingConfirmationPersonal, setBookingConfirmationPersonal] =
    useState<{
      day: string | null;
      open: boolean;
      time: string | null;
    }>({ day: null, open: false, time: null });

  const [bookingConfirmationGroup, setBookingConfirmationGroup] = useState<{
    open: boolean;
    id: number | null;
  }>({ id: null, open: false });

  const getBookedSessions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/availability/${user.memberID}/getSessions`
      );
      console.log("List of booked sessions:", response.data);

      // filter out any sessions that have been cancelled by the trainer
      // const filteredSessions = await Promise.all(
      //   response.data.map(async (session: any) => {
      //     const isTrainerAvailable = await trainerStillAvailable(session);
      //     return isTrainerAvailable ? session : null;
      //   })
      // );

      // console.log("filteredSessions:", filteredSessions);

      setMemberBookedSessions(response.data);
    } catch (error) {
      console.log("Error retrieving booked sessions:", error);
    }
  };

  const getBookedFitnessClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/groupClasses/${user.memberID}/getClasses`
      );
      console.log("List of booked fitness classes:", response.data);
      setBookedFitnessClasses(response.data);
    } catch (error) {
      console.log("Error retrieving booked fitness classes:", error);
    }
  };
  const getFitnessClasses = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/groupClasses/getAllClasses`
      );
      console.log("List of available group fitness classes:", response.data);
      setFitnessClasses(response.data);
    } catch (error) {
      console.log("Error retrieving available fitness classes:", error);
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

  const handleBookSession = async (day: string | null, time: string | null) => {
    // implement booking session
    try {
      if (!day || !time) {
        throw new Error("Please select a date and time to book a session.");
      }
      await axios.put(
        `http://localhost:8080/availability/${user.memberID}/${selectedTrainer.memberID}/${day}/${time}/bookSession`,
        null
      );
      createBill(
        PurchaseType.PRIVATE_SESSION,
        ChargeType.PRIVATE_SESSION_CHARGE
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
      createBill(
        PurchaseType.PRIVATE_SESSION,
        ChargeType.PRIVATE_SESSION_REFUND
      );
      getBookedSessions();
    } catch (error) {
      console.log("Error deleting session:", error);
    }
  };

  const registerClass = async (classID: number | null) => {
    console.log("registering class with ID:", classID);
    try {
      if (!classID) {
        throw new Error("No Class selected!");
      }
      await axios.post(
        `http://localhost:8080/groupClasses/${user.memberID}/${classID}/register`,
        null
      );
      console.log("Successfully registered for class");
      createBill(PurchaseType.GROUP_SESSION, ChargeType.GROUP_SESSION_CHARGE);
      getFitnessClasses();
      getBookedFitnessClasses();
    } catch (error) {
      console.log("Error registering for class:", error);
    }
  };

  const cancelFitnessClass = async (classID: number) => {
    console.log("registering class with ID:", classID);
    try {
      await axios.delete(
        `http://localhost:8080/groupClasses/${user.memberID}/${classID}/unRegister`
      );
      console.log("Successfully un-registered for class");
      createBill(PurchaseType.GROUP_SESSION, ChargeType.GROUP_SESSION_REFUND);
      getFitnessClasses();
      getBookedFitnessClasses();
    } catch (error) {
      console.log("Error un-registering for class:", error);
    }
  };

  const createBill = async (purchaseType: PurchaseType, amount: ChargeType) => {
    try {
      await axios.post(
        `http://localhost:8080/billing/${user.email}/${amount}/${purchaseType}/pay`,
        null
      );
      console.log("Successfully created bill");
    } catch (error) {
      console.log("Error creating bill:", error);
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

  useEffect(() => {
    getAvailableTrainers();
    getFitnessClasses();
    getBookedSessions();
    getBookedFitnessClasses();
  }, []);

  return (
    <div>
      <div style={{ paddingBottom: "20px" }}>
        <h1>Schedule Management</h1>
        <Typography>
          This is where you can book sessions with a trainer, or register for a
          group fitness class. You can also view past sessions and cancel
          upcoming sessions.
        </Typography>
      </div>

      <Divider style={{ marginBottom: "20px" }} />
      <h2>Personal Training Sessions</h2>
      <div style={{ paddingLeft: "20px" }}>
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
                {selectedTrainer.firstName}'s availability is listed below.
                Please book a session based on the times listed below. If these
                times do not match your schedule, select another available
                trainer.
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
                                  setBookingConfirmationPersonal({
                                    day: day.dayAvailable,
                                    open: true,
                                    time,
                                  })
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
            session by clicking the cancel button.
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
                    CANCEL SESSION
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

      <Divider style={{ marginBottom: "20px", marginTop: "20px" }} />
      <h2>Group Fitness Classes</h2>
      <div style={{ paddingLeft: "20px" }}>
        <Typography
          variant="h5"
          style={{ paddingTop: "30px", paddingBottom: "20px" }}
        >
          Available Fitness Classes
          <Typography>
            Press book to register inside a group fitness class of your choice.
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
          {fitnessClasses.length > 0 ? (
            fitnessClasses.map((fitnessClass, index) => {
              // Check if the current fitness class is already booked
              const isBooked = bookedFitnessClasses.some(
                (bookedClass) => bookedClass.classID === fitnessClass.classID
              );
              const classCancelled = fitnessClass.room === null;

              return (
                <Card sx={{ minWidth: 275 }} key={index}>
                  <CardContent>
                    <Typography variant="h6">
                      {fitnessClass.className}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Scheduled Date:</b> {fitnessClass.scheduledDate}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Scheduled Time:</b> {fitnessClass.scheduledTime}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Room:</b> {fitnessClass.room?.roomName ?? "N/A"}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {isBooked ? (
                      <Button size="small" color="info" disabled>
                        ALREADY BOOKED
                      </Button>
                    ) : fitnessClass.numberMembers ===
                      fitnessClass.room?.capacity ? (
                      <Button size="small" color="error" disabled>
                        CLASS FULL
                      </Button>
                    ) : fitnessClass.room === null ? (
                      <Button size="small" color="error" disabled>
                        CANCELLED
                      </Button>
                    ) : (
                      <Button
                        size="small"
                        sx={{ color: "#f9a826" }}
                        onClick={() =>
                          setBookingConfirmationGroup({
                            open: true,
                            id: fitnessClass.classID,
                          })
                        }
                      >
                        REGISTER
                      </Button>
                    )}
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

        <Typography
          variant="h5"
          style={{ paddingTop: "30px", paddingBottom: "20px" }}
        >
          Your Booked Classes
          <Typography>
            Below you can view successfully booked fitness group classes. Cancel
            any upcoming session by clicking the cancel button.
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
          {bookedFitnessClasses.length > 0 ? (
            bookedFitnessClasses.map((fitnessClass, index) => {
              const classCancelled = fitnessClass.room === null;
              return (
                <Card sx={{ minWidth: 275 }} key={index}>
                  <CardContent>
                    <Typography variant="h6">
                      {fitnessClass.className}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Scheduled Date:</b> {fitnessClass.scheduledDate}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Scheduled Time:</b> {fitnessClass.scheduledTime}
                    </Typography>
                    <Typography gutterBottom color="text.secondary">
                      <b>Room:</b>{" "}
                      {classCancelled ? "N/A" : fitnessClass.room.roomName}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {!classCancelled ? (
                      <Button
                        size="small"
                        sx={{ color: "#f9a826" }}
                        onClick={() => cancelFitnessClass(fitnessClass.classID)}
                      >
                        CANCEL
                      </Button>
                    ) : (
                      <Button size="small" sx={{ color: "#f9a826" }} disabled>
                        CANCELLED
                      </Button>
                    )}
                  </CardActions>
                </Card>
              );
            })
          ) : (
            <Typography variant="body2" color="text.secondary">
              You have not booked any fitness classes.
            </Typography>
          )}
        </div>
      </div>

      {/* Billing Confirmation Dialog for Personal Trainer */}
      <Dialog open={bookingConfirmationPersonal.open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {`Billing Confirmation`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {` The total for this session is $${ChargeType.PRIVATE_SESSION_REFUND}. Would you like to proceed?`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cardNumber"
            label="Card Number"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="expiryDate"
            label="Expiry Date"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="cvv"
            label="CVV"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setBookingConfirmationPersonal({
                day: null,
                open: false,
                time: null,
              })
            }
            sx={{ color: "#f9a826" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={() => {
              handleBookSession(
                bookingConfirmationPersonal.day,
                bookingConfirmationPersonal.time
              );
              setBookingConfirmationPersonal({
                day: null,
                open: false,
                time: null,
              });
            }}
            autoFocus
            sx={{ bgcolor: "#f9a826", color: "white" }}
          >
            BOOK
          </Button>
        </DialogActions>
      </Dialog>

      {/* Billing Confirmation Dialog for Group Train */}
      <Dialog open={bookingConfirmationGroup.open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {`Billing Confirmation`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {` The total for this session is $${ChargeType.GROUP_SESSION_REFUND}. Would you like to proceed?`}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="cardNumber"
            label="Card Number"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="expiryDate"
            label="Expiry Date"
            type="text"
            fullWidth
          />
          <TextField
            margin="dense"
            id="cvv"
            label="CVV"
            type="password"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              setBookingConfirmationGroup({
                open: false,
                id: null,
              })
            }
            sx={{ color: "#f9a826" }}
          >
            CANCEL
          </Button>
          <Button
            onClick={() => {
              registerClass(bookingConfirmationGroup.id);
              setBookingConfirmationGroup({
                open: false,
                id: null,
              });
            }}
            autoFocus
            sx={{ bgcolor: "#f9a826", color: "white" }}
          >
            BOOK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ScheduleManagement;
