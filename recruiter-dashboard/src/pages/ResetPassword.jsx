import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css'; // (optional styling)

function ResetPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const userIndex = users.findIndex((u) => u.email === email);
    if (userIndex === -1) {
      alert("No user found with that email.");
      return;
    }

    users[userIndex].password = newPassword;
    localStorage.setItem('users', JSON.stringify(users));

    alert('Password reset successful. You can now login.');
    navigate('/login');
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <form onSubmit={handleReset}>
        <input
          type="email"
          placeholder="Enter your registered email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter new password"
          required
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ResetPassword;
