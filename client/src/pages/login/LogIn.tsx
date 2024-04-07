import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `http://localhost:8080/members/${username}`
      );
      if (response.data.pass_word !== password) {
        throw new Error("Wrong username or password");
      }
      setErrorMessage("");
      console.log(response.data);
      // navigate to dashboard page after successful registration
      localStorage.setItem("email", username);
      navigate("/home");
    } catch (error) {
      setErrorMessage("Wrong username or password. Please try again.");
      console.error(error);
    }
  };

  return (
    <div
      style={{ display: "flex", alignItems: "center", flexDirection: "column" }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "30px",
          width: "400px",
          padding: "10px",
          margin: "150px",
        }}
      >
        <h2>Welcome Back to FitnessTrackr</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "10px",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Email"
              style={{ width: "300px", height: "25px", fontSize: "15px" }}
              required
            />
            <input
              type="text"
              value={password}
              placeholder="Password"
              style={{ width: "300px", height: "25px", fontSize: "15px" }}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
            {errorMessage && <div>{errorMessage}</div>}
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
            }}
          >
            Sign in
          </button>
        </form>

        <div>
          New to FitnessTrackr?{" "}
          <a
            href="/register"
            style={{
              textDecoration: "none",
              color: "#F9A826",
              fontWeight: "bold",
            }}
          >
            Join now
          </a>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
