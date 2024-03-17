"use client";
import React, { useEffect, useState } from "react";
import "./doctorlogin.css"; // Import CSS file for styling

const DoctorLogin = () => {
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      window.location.href = "/dashboard";
    }
  }, []);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: fullName,
        number: phoneNumber,
      }),
    });
    const data = await res.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-container">
      <h2
        className="login-heading"
        style={{
          fontSize: "2rem",
        }}
      >
        Doctor Login
      </h2>
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Your Full name:
          </label>
          <input
            type="text"
            id="username"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="form-label">
            Phone Number:
          </label>
          <input
            type="text"
            id="password"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="form-input"
          />
        </div>
        <div className="button-container">
          <button type="submit" className="login-button">
            Login/Signup
          </button>
        </div>
      </form>
      <footer className="footer-text">
        Made by Beyond Bytes for AlphaBytes 1.0 hackathon
      </footer>
    </div>
  );
};

export default DoctorLogin;
