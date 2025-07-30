// src/App.jsx
import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
  useLocation
} from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import Welcome from './pages/Welcome';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './components/Dashboard';
import JobPosting from './components/JobPosting';
import PostedJobs from './components/PostedJobs';
import StudentProfiles from './components/StudentProfiles';
import StudentDetail from './components/StudentDetail';
import JobDetails from './components/JobDetails';
import ResetPassword from './pages/ResetPassword';

import CommunicationTools from './components/CommunicationTools/CommunicationTools';
import MessageTriggers from './components/CommunicationTools/MessageTriggers';
import CommunicationDashboard from './pages/CommunicationDashboard';

import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AppWrapper() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const isAuthPage = ['/', '/login', '/register', '/forgot-password'].includes(location.pathname);

  const handleLogout = () => {
    setUser(null);
    window.location.href = '/';
  };

  return (
    <>
      {!isAuthPage && user && !location.pathname.startsWith('/communication-tools/sidebar') && (
        <div className="topbar">
          <h1>Recruiter Dashboard</h1>
          <div className="nav-links">
            <Link to="/post-job">Job Posting</Link>
            <Link to="/posted-jobs">Posted Jobs</Link>
            <Link to="/students">Student Profiles</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/communication-tools">Communication Tools</Link>
            <span className="user-profile">{user?.username || user?.email}</span>
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      )}

      <div className="container">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            {/* Public Routes */}
            <Route path="/" element={<Welcome />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/forgot-password" element={<ResetPassword />} />

            {/* Protected Routes */}
            <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
            <Route path="/post-job" element={user ? <JobPosting /> : <Navigate to="/" />} />
            <Route path="/posted-jobs" element={user ? <PostedJobs /> : <Navigate to="/" />} />
            <Route path="/students" element={user ? <StudentProfiles /> : <Navigate to="/" />} />
            <Route path="/student/:id" element={user ? <StudentDetail /> : <Navigate to="/" />} />
            <Route path="/job/:id" element={user ? <JobDetails /> : <Navigate to="/" />} />

            {/* Communication Tools */}
            <Route path="/communication-tools" element={user ? <CommunicationTools /> : <Navigate to="/" />} />
            <Route path="/communication-tools/message-triggers" element={user ? <MessageTriggers /> : <Navigate to="/" />} />
            <Route path="/communication-tools/sidebar/*" element={user ? <CommunicationDashboard /> : <Navigate to="/" />} />
          </Routes>
        </AnimatePresence>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
