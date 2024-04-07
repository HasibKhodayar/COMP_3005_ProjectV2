import CloseIcon from "@mui/icons-material/Close";
import { IconButton, Snackbar, TextField } from "@mui/material";

import DecimalInput from "../../../components/DecimalInput";
import React, { useState } from "react";

function GoalsMetrics({ user }: { user: any }) {
  const [goalDescription, setGoalDescription] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [targetBodyFat, setTargetBodyFat] = useState("");
  const [targetMuscleMass, setTargetMuscleMass] = useState("");
  const [openResult, setOpenResult] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    console.log("handling submit");
    try {
      //   if (newFirstName != user.firstName) {
      //     await axios.put(
      //       `http://localhost:8080/members/${user.id}/updateFirstName`,
      //       null,
      //       {
      //         params: {
      //           newFirstName,
      //         },
      //       }
      //     );
      //   }

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
            <div
              style={{
                paddingBottom: "20px",
                maxWidth: "400px",
                fontStyle: "italic",
              }}
            >
              It doesn't seem you have any fitness goals set yet. Set your goals
              by clicking the button below.
            </div>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "10px" }}
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
                  onChange={(e) => setGoalDescription(e.target.value)}
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
