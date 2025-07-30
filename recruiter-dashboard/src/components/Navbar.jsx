// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <h2 className="logo">Recruiter Dashboard</h2>
      <div className="nav-links">
        <Link to="/">Job Posting</Link>
        <Link to="/posted-jobs">Posted Jobs</Link>
        <Link to="/students">Student Profiles</Link>
      </div>
    </nav>
  );
};

export default Navbar;
