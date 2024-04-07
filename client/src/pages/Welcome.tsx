import React from "react";
import picture from "../pics/mainpic.svg";

const Welcome = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Welcome to FitnessTrackr</h1>
      <img src={picture} alt="" width={"500px"} height={"500px"} />
      <button
        style={{
          marginTop: "20px",
          backgroundColor: "#F9A826",
          color: "white",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          borderRadius: "15px",
          fontSize: "15px",
          fontWeight: "bold",
        }}
      >
        <a href="/register" style={{ textDecoration: "none", color: "white" }}>
          Sign Up
        </a>
      </button>
    </div>
  );
};

export default Welcome;
