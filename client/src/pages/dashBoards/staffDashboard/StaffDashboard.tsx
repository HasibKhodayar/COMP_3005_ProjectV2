import React, { useState } from "react";
import axios from "axios";
import { Button } from "@mui/material";
import ProfileSettings from "../memberDashboard/ProfileSettings";
import Dashboard from "./Dashboard";
import BillingDetails from "./BillingDetails";
import ClassSchedules from "./ClassSchedules";
import EquipmentMaintenance from "./EquipmentMaintenance";
import RoomBooking from "./RoomBooking";

const StaffDashboard = ({ user }: { user: any }) => {
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
            activeSection === "roombooking" ? "active" : ""
          }`}
          onClick={() => handleNavClick("roombooking")}
        >
          Room Booking
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "equipment" ? "active" : ""
          }`}
          onClick={() => handleNavClick("equipment")}
        >
          Equipment Maintenance
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "classes" ? "active" : ""
          }`}
          onClick={() => handleNavClick("classes")}
        >
          Class Schedules
        </Button>
        <Button
          style={{ color: "white", fontWeight: "bold" }}
          className={`navbar-button ${
            activeSection === "billing" ? "active" : ""
          }`}
          onClick={() => handleNavClick("billing")}
        >
          Billing
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
        {activeSection === "roombooking" && (
          <div>
            <RoomBooking user={user} />
          </div>
        )}
        {activeSection === "equipment" && (
          <div>
            <EquipmentMaintenance user={user} />
          </div>
        )}
        {activeSection === "classes" && (
          <div>
            <ClassSchedules user={user} />
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

export default StaffDashboard;
