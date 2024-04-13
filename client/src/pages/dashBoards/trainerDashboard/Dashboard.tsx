import React, { useEffect, useState } from "react";
import {
  Avatar,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import axios from "axios";
import SearchIcon from "@mui/icons-material/Search";
import { AccountCircle } from "@mui/icons-material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

function Dashboard({ user }: { user: any }) {
  // Initialize state for alignment with default values for each day
  const [alignment, setAlignment] = useState<{ [key: string]: string }>({
    Monday: "left",
    Tuesday: "left",
    Wednesday: "left",
    Thursday: "left",
    Friday: "left",
    Saturday: "left",
    Sunday: "left",
  });

  const [memberFirstName, setMemberFirstName] = useState<string>("");
  const [memberLastName, setMemberLastName] = useState<string>("");
  const [retrievedMember, setRetrievedMember] = useState<any>();
  const [searchResult, setSearchResult] = useState<string>("");

  const handleAlignment = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null,
    day: string // Pass the day as an additional argument
  ) => {
    if (newAlignment) {
      console.log("newAlignment", newAlignment);
      setAlignment({ ...alignment, [day]: newAlignment });
    }
  };

  const setAvailableDays = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/availability/${user.memberID}/getAvailableDays`
      );
      console.log(
        "Successfully retrieved available days for trainer:",
        response
      );

      // show the available days as green checkboxes in UI
      setAlignment((prevAlignment) => {
        const updatedAlignment = { ...prevAlignment };
        response.data.forEach((day: any) => {
          console.log("day", day.dayAvailable);
          updatedAlignment[day.dayAvailable] = "right";
        });
        return updatedAlignment;
      });
    } catch (e) {
      console.error("Error fetching exercises", e);
    }
  };

  const bookWorkDay = async (newAlignment: string, day: string) => {
    try {
      if (newAlignment === "right") {
        const response = await axios.post(
          `http://localhost:8080/availability/${user.memberID}/${day}/createAvailability`
        );
      } else if (newAlignment === "left") {
        const response = await axios.delete(
          `http://localhost:8080/availability/${user.memberID}/${day}/deleteAvailability`
        );
      }
      setAvailableDays();
    } catch (error) {
      console.error("Error booking work day", error);
    }
  };

  const searchForMember = async (e: any) => {
    e.preventDefault();
    console.log("searching for member");

    try {
      const response = await axios.get(
        `http://localhost:8080/members/${memberFirstName}/${memberLastName}/searchMember`
      );
      console.log("Successfully retrieved member:", response);
      if (response.data.length > 0) {
        setSearchResult("Member found!");
        setRetrievedMember(response.data);
      } else {
        setSearchResult(
          `Seems that the member '${memberFirstName} ${memberLastName}' does not exist. Please try again.`
        );
      }
    } catch (e) {
      console.error("Error fetching member", e);
      setSearchResult(
        `Seems that the member '${memberFirstName} ${memberLastName}' does not exist. Please try again.`
      );
    }
  };

  useEffect(() => {
    setAvailableDays();
  }, []);

  return (
    <div>
      <h1>Welcome to Your Trainer Dashboard!</h1>
      <p>
        Here, you have access to powerful tools to enhance your training
        experience:
      </p>
      <ul>
        <li>
          <b>Schedule Management:</b> Take control of your availability by
          setting the times you're available for sessions. With this feature,
          you can efficiently manage your time and schedule sessions with ease.
        </li>
        <li>
          <b>Member Profile Viewing:</b> Easily search for and view member
          profiles by name. Stay informed about your clients' progress, goals,
          and preferences, allowing you to provide personalized training plans
          and support.
        </li>
      </ul>
      <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />
      <h2>Schedule Management</h2>
      {days.map((day) => (
        <div
          key={day}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyItems: "center",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <ToggleButtonGroup
            value={alignment[day]}
            exclusive
            onChange={(event, newAlignment) => {
              bookWorkDay(newAlignment, day);
              handleAlignment(event, newAlignment, day);
            }}
            aria-label="text alignment"
            size="small"
          >
            <ToggleButton value="left" aria-label="right aligned" color="error">
              <CancelIcon />
            </ToggleButton>
            <ToggleButton
              value="right"
              aria-label="right aligned"
              color="success"
            >
              <CheckCircleIcon />
            </ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="h6">{day}</Typography>
        </div>
      ))}
      <Divider style={{ marginTop: "30px", marginBottom: "30px" }} />
      <h2>Member Profile Search</h2>
      <Typography>Search by first and last name.</Typography>
      <Typography
        style={{ fontStyle: "italic" }}
        color={searchResult === "Member found!" ? "success" : "error"}
        padding={"10px"}
      >
        {searchResult}
      </Typography>
      <form
        onSubmit={searchForMember}
        style={{
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
          marginLeft: "20px",
          gap: "5px",
        }}
      >
        <TextField
          id="outlined-multiline-flexible"
          multiline
          placeholder="Enter member first name"
          sx={{ width: "240px" }}
          maxRows={4}
          value={memberFirstName}
          onChange={(e: any) => setMemberFirstName((prev) => e.target.value)}
        />
        <TextField
          id="outlined-multiline-flexible"
          multiline
          placeholder="Enter member last name"
          sx={{ width: "240px" }}
          maxRows={4}
          value={memberLastName}
          onChange={(e: any) => setMemberLastName((prev) => e.target.value)}
        />
        <IconButton
          aria-label="delete"
          style={{ color: "#f9a826" }}
          type="submit"
        >
          <SearchIcon sx={{ fontSize: 32 }} />
        </IconButton>
      </form>
      {retrievedMember &&
        retrievedMember.map((retrievedMember: any, index: number) => (
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar sx={{ bgcolor: "#f9a826" }}>
                <AccountBoxIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={`${retrievedMember.firstName} ${retrievedMember.lastName}`}
              secondary={`${retrievedMember.email} | ${retrievedMember.phoneNumber}`}
            />
          </ListItem>
        ))}
    </div>
  );
}

export default Dashboard;
