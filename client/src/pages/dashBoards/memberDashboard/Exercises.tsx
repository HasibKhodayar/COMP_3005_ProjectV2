import DecimalInput from "../../../components/DecimalInput";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Exercises({ user }: { user: any }) {
  const [exercises, setExercises] = useState<any[]>([]);
  const [sets, setSets] = useState();
  const [reps, setReps] = useState();
  const [exerciseName, setExerciseName] = useState("");

  const fetchExercises = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/routines/${user.memberID}/getRoutines`
      );
      console.log("exercises", response);
      setExercises(response.data);
    } catch (e) {
      console.error("Error fetching exercises", e);
    }
  };

  const handleDelete = async (routineID: number) => {
    try {
      await axios.delete(
        `http://localhost:8080/routines/${routineID}/deleteRoutine`
      );
      fetchExercises();
    } catch (err) {
      console.error(err);
    }
  };

  const submitExercise = async (e: any) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:8080/routines`, {
        member: user,
        name: exerciseName,
        reps: reps,
        sets: sets,
      });
      fetchExercises();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchExercises();
  }, []);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <h1>Exercises</h1>
        <Typography>
          This is where you can view any set exercises you have. You can also
          add new ones by filling out the form below and clicking save.
        </Typography>
      </div>

      <form
        onSubmit={submitExercise}
        style={{
          display: "flex",
          flexDirection: "column",
          marginBottom: "10px",
          marginLeft: "20px",
        }}
      >
        <div>
          <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
            Exercise name:
          </div>
          <TextField
            id="outlined-multiline-flexible"
            multiline
            sx={{ width: "400px" }}
            maxRows={4}
            value={exerciseName}
            onChange={(e: any) => setExerciseName((prev) => e.target.value)}
          />
        </div>
        <div>
          <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
            How many sets does this exercise have?
          </div>
          <DecimalInput
            value={sets}
            onChange={(e: any) => setSets(e)}
            unit={""}
            sx={{ width: "100px" }}
          />
        </div>
        <div>
          <div style={{ fontSize: "18px", paddingBottom: "8px" }}>
            How many reps does this exercise have?
          </div>
          <DecimalInput
            value={reps}
            onChange={(e: any) => setReps(e)}
            unit={""}
            sx={{ width: "100px" }}
          />
        </div>
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
        <Divider style={{ padding: "10px" }} />
      </form>
      {exercises.length > 0 && (
        <div
          style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
        >
          {exercises.map((exercise: any) => (
            <Card sx={{ width: 175, margin: "10px" }} key={exercise.routineID}>
              <CardContent>
                <Typography
                  variant="h5"
                  component="div"
                  style={{ paddingBottom: "10px" }}
                >
                  {exercise.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {exercise.reps} reps
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {exercise.sets} sets
                </Typography>
                <CardActions>
                  <Button
                    size="small"
                    sx={{ color: "#f9a826" }}
                    onClick={() => handleDelete(exercise.routineID)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </>
  );
}

export default Exercises;
