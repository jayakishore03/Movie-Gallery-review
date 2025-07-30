import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import axios from 'axios';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password
      });

      alert(response.data.message);

      // ✅ Store user data in state (not localStorage)
      setUser(response.data.user);

      // ✅ Redirect
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed.');
      console.error('Login error:', err);
    }
  };

  return (
    <div className="auth-container">
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        <img
          src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
          alt="Login Logo"
          style={{ width: '80px', borderRadius: '50%' }}
        />
      </div>

      <h2>Welcome Back</h2>

      <form onSubmit={handleLogin}>
        <label>Email Address <span style={{ color: 'red' }}>*</span></label>
        <input
          type="email"
          required
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password <span style={{ color: 'red' }}>*</span></label>
        <input
          type="password"
          required
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
