import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import Dashboard from "./Dashboard";
import ProfileSettings from "./ProfileSettings";
import ScheduleManagement from "./ScheduleManagement";
import GoalsMetrics from "./GoalsMetrics";
import Exercises from "./Exercises";
import BillingDetails from "./BillingDetails";

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
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "goals" ? "active" : ""
          }`}
          onClick={() => handleNavClick("goals")}
        >
          Metrics and Goals
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "exercises" ? "active" : ""
          }`}
          onClick={() => handleNavClick("exercises")}
        >
          Exercises
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
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "billing" ? "active" : ""
          }`}
          onClick={() => handleNavClick("billing")}
        >
          Billing Details
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

        {activeSection === "goals" && (
          <div>
            <GoalsMetrics user={user} />
          </div>
        )}
        {activeSection === "schedule" && (
          <div>
            <ScheduleManagement user={user} />
          </div>
        )}
        {activeSection === "exercises" && (
          <div>
            <Exercises user={user} />
          </div>
        )}
        {activeSection === "billing" && (
          <div>
            <BillingDetails user={user} />
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberDashboard;
