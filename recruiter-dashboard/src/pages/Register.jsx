import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';
import axios from 'axios';


function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/register', {
        username,
        email,
        password,
        confirmpassword: confirmPassword,
        mobilenumber: mobile
      });

      alert(response.data.message);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.error || 'Registration failed.');
      console.error(err);
    }
  };
  return (
    <div className="auth-container">
      {/* Logo */}
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135768.png"
          alt="Register Logo"
          style={{ width: '80px', borderRadius: '50%' }}
        />
      </div>

      {/* Heading */}
      <h2>Create Your Account</h2>

      {/* Form */}
      <form onSubmit={handleRegister}>
        <label>Username <span style={{ color: 'red' }}>*</span></label>
        <input
          type="text"
          placeholder="Enter username"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label>Email Address <span style={{ color: 'red' }}>*</span></label>
        <input
          type="email"
          placeholder="Enter email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Mobile Number <span style={{ color: 'red' }}>*</span></label>
        <input
          type="tel"
          placeholder="Enter mobile number"
          pattern="[0-9]{10}"
          title="Enter 10-digit mobile number"
          required
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
        />

        <label>Password <span style={{ color: 'red' }}>*</span></label>
        <input
          type="password"
          placeholder="Enter password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <label>Confirm Password <span style={{ color: 'red' }}>*</span></label>
        <input
          type="password"
          placeholder="Re-enter password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>

      <p style={{ marginTop: '10px', textAlign: 'center' }}>
        <a href="/forgot-password">Forgot Password?</a>
      </p>
    </div>
  );
}

export default Register;
