import { Button, IconButton, Snackbar } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import axios from "axios";
import React, { useState } from "react";

function ProfileSettings({ user }: { user: any }) {
  const [newFirstName, setNewFirstName] = useState(user.firstName);
  const [newLastName, setNewLastName] = useState(user.lastName);
  const [newPhoneNumber, setNewPhoneNumber] = useState(user.phoneNumber);
  const [newEmail, setNewEmail] = useState(user.email);
  const [newPassword, setNewPassword] = useState(user.pass_word);
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("handling submit");
    try {
      if (newFirstName != user.firstName) {
        await axios.put(
          `http://localhost:8080/members/${user.id}/updateFirstName`,
          null,
          {
            params: {
              newFirstName,
            },
          }
        );
      }

      if (newLastName != user.lastName) {
        await axios.put(
          `http://localhost:8080/members/${user.id}/updateLastName`,
          null,
          {
            params: {
              newLastName,
            },
          }
        );
      }

      if (newPhoneNumber != user.phoneNumber) {
        await axios.put(
          `http://localhost:8080/members/${user.id}/updatePhoneNumber`,
          null,
          {
            params: {
              newPhoneNumber,
            },
          }
        );
      }

      if (newEmail != user.email) {
        await axios.put(
          `http://localhost:8080/members/${user.id}/updateEmail`,
          null,
          {
            params: {
              newEmail,
            },
          }
        );

        localStorage.setItem("email", newEmail);
      }

      if (newPassword != user.pass_word) {
        await axios.put(
          `http://localhost:8080/members/${user.id}/updatePassword`,
          null,
          {
            params: {
              newPassword,
            },
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
    <div>
      <h1>Profile settings</h1>

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
            Modify account details here.
          </div>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <div style={{ fontSize: "18px" }}>First name:</div>
              <input
                type="text"
                value={newFirstName}
                onChange={(e) => setNewFirstName(e.target.value)}
                style={{
                  width: "300px",
                  height: "25px",
                  fontSize: "15px",
                }}
                required
              />
            </div>

            <div>
              <div style={{ fontSize: "18px" }}>Last name:</div>
              <input
                type="text"
                value={newLastName}
                onChange={(e) => setNewLastName(e.target.value)}
                style={{
                  width: "300px",
                  height: "25px",
                  fontSize: "15px",
                }}
                required
              />
            </div>

            <div>
              <div style={{ fontSize: "18px" }}>Phone number:</div>
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                style={{
                  width: "300px",
                  height: "25px",
                  fontSize: "15px",
                }}
                required
              />
            </div>

            <div>
              <div style={{ fontSize: "18px" }}>Email:</div>
              <input
                type="text"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                style={{
                  width: "300px",
                  height: "25px",
                  fontSize: "15px",
                }}
                required
              />
            </div>

            <div>
              <div style={{ fontSize: "18px" }}>Password:</div>
              <input
                type="text"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                style={{
                  width: "300px",
                  height: "25px",
                  fontSize: "15px",
                }}
                required
              />
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
  );
}

export default ProfileSettings;
