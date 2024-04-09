import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard({ user }: { user: any }) {
  const [dashboardContents, setDashboardContents] = useState(false);

  // check if the user has any data to display
  const checkForData = async () => {
    try {
      const metrics = await axios.get(
        `http://localhost:8080/members/${user.id}/getMetrics`
      );

      const fitnessGoal = await axios.get(
        `http://localhost:8080/members/${user.id}/getFitnessGoal`
      );

      console.log("metrics", metrics);
      console.log("fitnessGoal", fitnessGoal);
    } catch (e) {
      console.error("Error checking for user data:", e);
      setDashboardContents(false);
    }
  };

  useEffect(() => {
    checkForData();
  }, []);

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
            <p>Display user data here</p>
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
