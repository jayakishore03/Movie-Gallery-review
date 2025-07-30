// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Recruiter Dashboard</h1>
      <div className="auth-buttons">
        <Link to="/register">
          <button className="home-btn">Register</button>
        </Link>
        <Link to="/login">
          <button className="home-btn">Login</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
