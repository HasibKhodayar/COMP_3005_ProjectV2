import {
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BarChart, LineChart } from "@mui/x-charts";
import Exercises from "./Exercises";

function Dashboard({ user }: { user: any }) {
  const [dashboardContents, setDashboardContents] = useState(false);
  const [metrics, setMetrics] = useState<any>();
  const [fitnessGoal, setFitnessGoal] = useState<any>();
  const [remainingWeight, setRemainingWeight] = useState<number>(0);
  const [remainingPercentage, setRemainingPercentage] = useState<number>(0);

  const [dateXAxis, setDateXAxis] = useState<any>([]);
  const [weightYAxis, setWeightYAxis] = useState<any>([]);
  const [fatYAxis, setFatYAxis] = useState<any>([]);
  const [muscleYAxis, setMuscleYAxis] = useState<any>([]);

  const [exercises, setExercises] = useState<any[]>([]);

  // check if the user has any data to display
  const checkForData = async () => {
    try {
      const metrics = await axios.get(
        `http://localhost:8080/healthMetrics/${user.memberID}/getAllMetrics`
      );

      const fitnessGoal = await axios.get(
        `http://localhost:8080/fitnessGoals/${user.memberID}`
      );

      console.log("metrics", metrics);
      console.log("fitnessGoal", fitnessGoal);
      setMetrics(metrics.data);
      setFitnessGoal(fitnessGoal.data);
      if (metrics.data && fitnessGoal.data && metrics.data.length > 0) {
        setDashboardContents(true);
      }
    } catch (e) {
      console.error("Error checking for user data:", e);
      setDashboardContents(false);
    }
  };

  const calculateRemainingWeight = () => {
    if (metrics && fitnessGoal && metrics[0]) {
      setRemainingWeight(
        Math.abs(fitnessGoal.targetWeight - metrics[metrics.length - 1].weight)
      );
      setRemainingPercentage(
        Math.abs(
          (metrics[metrics.length - 1].weight / fitnessGoal.targetWeight) * 100
        )
      );

      console.log(remainingPercentage);
    }
  };

  const calculateMetricGraphs = () => {
    if (metrics && metrics.length > 0) {
      const weightData: any[] = [];
      const fatData: any[] = [];
      const muscleData: any[] = [];
      const dates: any[] = [];
      metrics.forEach((metric: any) => {
        weightData.push(metric.weight);
        fatData.push(metric.bodyFat);
        muscleData.push(metric.muscleMass);
        dates.push(metric.metricDate.split("T")[0]);
      });

      setWeightYAxis(weightData);
      setFatYAxis(fatData);
      setMuscleYAxis(muscleData);
      setDateXAxis(dates);
    }
  };

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

  useEffect(() => {
    fetchExercises();
  }, []);

  useEffect(() => {
    checkForData();
  }, []);

  useEffect(() => {
    calculateRemainingWeight();
    calculateMetricGraphs();
  }, [metrics, fitnessGoal]);

  return (
    <div>
      <h1>
        Welcome to your dashboard,{" "}
        {user.firstName === "" ? "Guest" : user.firstName}!
      </h1>
      {
        // if the user has data, display the dashboard contents
        dashboardContents ? (
          <div>
            <p>
              This is where you can view your progress, goals, schedule, and set
              exercises.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
            >
              <div
                style={{
                  padding: "20px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                  borderRadius: "13px",
                  margin: "4px",
                  width: "40%",
                }}
              >
                <h1>Achievements</h1>
                <div
                  className="sub-square"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "50px",
                  }}
                >
                  <div style={{ width: "200px" }}>
                    <CircularProgress
                      variant="determinate"
                      size={160}
                      style={{ color: "#f9a826" }}
                      value={remainingPercentage}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <h2>{remainingWeight} lb. remaining</h2>
                    <p style={{ fontStyle: "italic" }}>
                      Fitness isn't just about the body; it's a journey of
                      self-discovery, where every drop of sweat is a testament
                      to your commitment and strength.
                    </p>
                  </div>
                </div>
              </div>
              <div
                style={{
                  padding: "20px",
                  borderRadius: "13px",
                  boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                  margin: "4px",
                  width: "60%",
                }}
              >
                <div className="sub-square">
                  <h1>Exercise Routines</h1>
                </div>
                <>
                  {exercises.length > 0 ? (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {exercises.map((exercise: any) => (
                        <Card
                          sx={{ width: 175, margin: "10px" }}
                          key={exercise.routineID}
                        >
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
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <div>
                      Seems like you don't have any exercises saved. Head over
                      to the exercises tab to set some.
                    </div>
                  )}
                </>
              </div>
            </div>
            <div
              className="sub-square"
              style={{
                padding: "20px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.5)",
                borderRadius: "13px",
                margin: "4px",
              }}
            >
              <h1>Health Metric Stats</h1>
              <h3>Weight progress:</h3>
              <BarChart
                series={[{ data: weightYAxis, color: "#f9a826" }]}
                height={290}
                xAxis={[
                  {
                    data: dateXAxis,
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
              <h3>Fat percentage progress:</h3>
              <BarChart
                series={[{ data: fatYAxis, color: "#f9a826" }]}
                height={290}
                xAxis={[
                  {
                    data: dateXAxis,
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
              <h3>Muscle percentage progress:</h3>
              <BarChart
                series={[{ data: muscleYAxis, color: "#f9a826" }]}
                height={290}
                xAxis={[
                  {
                    data: dateXAxis,
                    scaleType: "band",
                  },
                ]}
                margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
              />
            </div>
          </div>
        ) : (
          // if the user has no data, display a message to get started
          <p>
            This is where you can view your progress, goals, schedule, and set
            exercises. To get started, click on the navigation bar at the top of
            the page and set your metrics and goals.
          </p>
        )
      }
    </div>
  );
}

export default Dashboard;
