import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Dashboard from "./Dashboard";
import ProfileSettings from "./ProfileSettings";
import ScheduleManagement from "./ScheduleManagement";

const MemberDashboard = ({ user }: { user: any }) => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <nav
        className="navbar"
        style={{
          backgroundColor: "#F9A826",
          display: "flex",
          flexDirection: "row",
          gap: "20px",
          paddingLeft: "20px",
        }}
      >
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "dashboard" ? "active" : ""
          }`}
          onClick={() => handleNavClick("dashboard")}
        >
          Dashboard
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "profile" ? "active" : ""
          }`}
          onClick={() => handleNavClick("profile")}
        >
          Profile Information
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "schedule" ? "active" : ""
          }`}
          onClick={() => handleNavClick("schedule")}
        >
          Metrics and Goals
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "schedule" ? "active" : ""
          }`}
          onClick={() => handleNavClick("schedule")}
        >
          Schedule Management
        </Button>
      </nav>
      {/* Content for each section */}
      <div style={{ padding: "40px", height: "700px" }}>
        {activeSection === "dashboard" && (
          <div>
            <Dashboard user={user} />
          </div>
        )}
        {activeSection === "profile" && (
          <div>
            <ProfileSettings user={user} />
          </div>
        )}
        {activeSection === "schedule" && (
          <div>
            <ScheduleManagement user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
