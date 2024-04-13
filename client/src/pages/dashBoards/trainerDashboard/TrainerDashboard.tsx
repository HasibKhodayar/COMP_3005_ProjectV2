import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ProfileSettings from "../memberDashboard/ProfileSettings";
import Dashboard from "./Dashboard";

const TrainerDashboard = ({ user }: { user: any }) => {
  const [activeSection, setActiveSection] = useState<string>("dashboard");

  const handleNavClick = (section: string) => {
    setActiveSection(section);
  };

  return (
    <div style={{ backgroundColor: "white" }}>
      <nav
        className="navbar"
        style={{
          backgroundColor: "#f9a826",
          display: "flex",
          flexDirection: "row",
          gap: "30px",
          paddingLeft: "40px",
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
      </nav>
      {/* Content for each section */}
      <div
        style={{
          padding: "40px",
          paddingLeft: "100px",
          paddingRight: "100px",
          minHeight: "700px",
          height: "fit-content",
        }}
      >
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
      </div>
    </div>
  );
};

export default TrainerDashboard;
