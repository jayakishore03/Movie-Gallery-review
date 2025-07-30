// src/pages/Welcome.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css'; // Make sure you create this file

const Welcome = () => {
  return (
    <div className="welcome-page">
      <h2>Welcome to the Recruiter Dashboard</h2>
      <div className="welcome-buttons">
        <Link to="/register" className="welcome-btn">Register</Link>
        <Link to="/login" className="welcome-btn">Login</Link>
      </div>
    </div>
  );
};

export default Welcome;
