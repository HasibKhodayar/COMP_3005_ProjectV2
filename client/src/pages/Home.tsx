import React, { useState, useEffect } from "react";
import axios from "axios";
import MemberDashboard from "./dashBoards/memberDashboard/MemberDashboard";
import TrainerDashboard from "./dashBoards/trainerDashboard/TrainerDashboard";
import StaffDashboard from "./dashBoards/staffDashboard/StaffDashboard";

const Home = () => {
  const [userInfo, setUserInfo] = useState<any>(null);

  // Fetch user information from the server when the component mounts
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userEmail = localStorage.getItem("email");
        const response = await axios.get(
          `http://localhost:8080/members/${userEmail}`
        );
        localStorage.setItem("userId", response.data.id);
        setUserInfo(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user information:", error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      {userInfo?.memberTypeId === 1 && <MemberDashboard user={userInfo} />}
      {userInfo?.memberTypeId === 2 && <TrainerDashboard user={userInfo} />}
      {userInfo?.memberTypeId === 3 && <StaffDashboard user={userInfo} />}
    </div>
  );
};

export default Home;
