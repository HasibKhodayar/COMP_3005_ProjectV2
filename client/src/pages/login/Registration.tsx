import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Registration = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [memberType, setMemberType] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      // send a POST request to the server with user data
      const response = await axios.post(
        "http://localhost:8080/members/register",
        {
          firstName,
          lastName,
          email,
          password,
          phoneNumber: phone,
          memberTypeId: parseInt(memberType),
        }
      );
      setSuccessMessage(response.data);
      setErrorMessage("");
      console.log("success", response);

      // navigate to dashboard page after successful registration
      localStorage.setItem("email", email);
      navigate("/home");
    } catch (error: any) {
      setSuccessMessage("");
      setErrorMessage(error.response.data);
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
        <h2>Member Registration</h2>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: "10px",
              alignItems: "center",
            }}
          >
            <div
              style={{ display: "flex", flexDirection: "column", gap: "2px" }}
            >
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First name"
                style={{ width: "300px", height: "25px", fontSize: "15px" }}
                required
              />
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last name"
                style={{ width: "300px", height: "25px", fontSize: "15px" }}
                required
              />
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
                style={{ width: "300px", height: "25px", fontSize: "15px" }}
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                style={{ width: "300px", height: "25px", fontSize: "15px" }}
                required
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                style={{ width: "300px", height: "25px", fontSize: "15px" }}
                required
              />

              <select
                value={memberType}
                onChange={(e) => setMemberType(e.target.value)}
                style={{ width: "308px", height: "25px", fontSize: "15px" }}
                required
              >
                <option value="">I'm a..</option>
                <option value="1">Member</option>
                <option value="2">Trainer</option>
                <option value="3">Staff</option>
              </select>
            </div>

            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              {successMessage && <div>{successMessage}</div>}
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
              Register
            </button>
          </form>
        </div>
        <div>
          Already on FitnessTrackr?{" "}
          <a
            href="/logIn"
            style={{
              textDecoration: "none",
              color: "#F9A826",
              fontWeight: "bold",
            }}
          >
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Registration;
