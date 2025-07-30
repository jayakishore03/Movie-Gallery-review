// src/pages/CommunicationDashboard.jsx
import React from 'react';
import { Link, Routes, Route, useLocation } from 'react-router-dom';
import MessageTemplates from '../components/CommunicationTools/MessageTemplates';
import MessageTriggers from '../components/CommunicationTools/MessageTriggers';
import EventNotifications from '../components/CommunicationTools/EventNotifications';
import './CommunicationDashboard.css';

const CommunicationDashboard = () => {
  const location = useLocation();

  return (
    <div className="comm-layout">
      {/* Sidebar */}
      <div className="comm-sidebar">
        <h2>📢 Communication</h2>
        <ul>
          <li className={location.pathname.endsWith('message-templates') ? 'active' : ''}>
            <Link to="message-templates">Message Templates</Link>
          </li>
          <li className={location.pathname.endsWith('message-triggers') ? 'active' : ''}>
            <Link to="message-triggers">Message Triggers</Link>
          </li>
          <li className={location.pathname.endsWith('event-notifications') ? 'active' : ''}>
            <Link to="event-notifications">Event Notifications</Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="comm-main">
        <Routes>
          <Route path="message-templates" element={<MessageTemplates />} />
          <Route path="message-triggers" element={<MessageTriggers />} />
          <Route path="event-notifications" element={<EventNotifications />} />
          {/* Default fallback */}
          <Route path="*" element={<div><h3>Select a tool from the sidebar</h3></div>} />
        </Routes>
      </div>
    </div>
  );
};

export default CommunicationDashboard;
