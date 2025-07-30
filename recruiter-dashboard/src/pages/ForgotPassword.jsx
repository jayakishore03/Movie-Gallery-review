// src/pages/ForgotPassword.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const existingUser = users.find((u) => u.email === email);

    if (!existingUser) {
      alert('Email not found. Please register.');
      return;
    }

    // Save reset user to localStorage temporarily
    localStorage.setItem('resetEmail', email);
    navigate('/reset-password');
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleSubmit}>
        <label>Enter your registered email:</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default ForgotPassword;
