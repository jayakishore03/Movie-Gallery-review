// src/components/CommunicationTools/EventNotifications.jsx
import React, { useState } from 'react';
import './CommunicationTools.css';
import { motion, AnimatePresence } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'; // ✅ ADD THIS

const initialNotifications = [
  {
    id: 1,
    event: 'Application Status Changed',
    channels: ['Email', 'In-app'],
    audience: 'All Applicants',
    status: true,
  },
  {
    id: 2,
    event: 'Interview Scheduled',
    channels: ['Email'],
    audience: 'Shortlisted Candidates',
    status: true,
  },
  {
    id: 3,
    event: 'Deadline Reminder',
    channels: ['In-app'],
    audience: 'All Students',
    status: false,
  },
];

const EventNotifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState(null);

  const toggleNotification = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, status: !n.status } : n))
    );
    toast.info('Notification status toggled');
  };

  const handleEdit = (n) => {
    setSelectedNotification(n);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
    toast.error('Notification deleted');
  };

  const handleSave = async () => {
    if (!selectedNotification.event || !selectedNotification.audience) {
      toast.error('Please fill in all fields');
      return;
    }

    try {
      // ✅ Send to backend
      const payload = {
        name: selectedNotification.event,
        type: selectedNotification.channels.join(', '),
        status: selectedNotification.status ? 'Active' : 'Inactive',
        last_sent: new Date().toISOString().split('T')[0],
      };

      await axios.post('http://localhost:5000/api/event-notifications', payload);

      if (selectedNotification.id) {
        setNotifications((prev) =>
          prev.map((n) =>
            n.id === selectedNotification.id ? selectedNotification : n
          )
        );
        toast.success('Notification updated');
      } else {
        const newNotification = {
          ...selectedNotification,
          id: Date.now(),
        };
        setNotifications((prev) => [...prev, newNotification]);
        toast.success('New notification added');
      }

      setModalOpen(false);
      setSelectedNotification(null);
    } catch (error) {
      console.error('Error saving event notification:', error);
      toast.error('Failed to save notification');
    }
  };

  const handleNew = () => {
    setSelectedNotification({
      id: null,
      event: '',
      audience: '',
      channels: [],
      status: true,
    });
    setModalOpen(true);
  };

  return (
    <div className="comm-page">
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="comm-header">
        <h2>🔔 Event Notifications</h2>
        <button className="comm-btn blue" onClick={handleNew}>
          + New Notification
        </button>
      </div>

      <div className="notification-grid">
        {notifications.map((n) => (
          <div key={n.id} className="notification-card">
            <h4>📢 {n.event}</h4>
            <p>
              <span className="badge audience-badge">Audience: {n.audience}</span>
            </p>
            <p>
              <span className="badge email">
                Channels: {n.channels.join(', ')}
              </span>
            </p>
            <p>
              <span className={`badge ${n.status ? 'active' : 'inactive'}`}>
                Status: {n.status ? 'Active' : 'Inactive'}
              </span>
              <label className="switch ml-1" style={{ marginLeft: '10px' }}>
                <input
                  type="checkbox"
                  checked={n.status}
                  onChange={() => toggleNotification(n.id)}
                />
                <span className="slider round"></span>
              </label>
            </p>
            <div className="card-actions">
              <button className="comm-btn gray" onClick={() => handleEdit(n)}>
                Edit
              </button>
              <button className="comm-btn red" onClick={() => handleDelete(n.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {modalOpen && (
          <div className="modal-overlay">
            <motion.div
              className="modal-box"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3>{selectedNotification?.id ? 'Edit' : 'New'} Notification</h3>
              <input
                type="text"
                value={selectedNotification?.event}
                onChange={(e) =>
                  setSelectedNotification({
                    ...selectedNotification,
                    event: e.target.value,
                  })
                }
                placeholder="Event Title"
              />
              <input
                type="text"
                value={selectedNotification?.audience}
                onChange={(e) =>
                  setSelectedNotification({
                    ...selectedNotification,
                    audience: e.target.value,
                  })
                }
                placeholder="Audience"
              />
              <input
                type="text"
                value={selectedNotification?.channels.join(', ')}
                onChange={(e) =>
                  setSelectedNotification({
                    ...selectedNotification,
                    channels: e.target.value.split(',').map((c) => c.trim()),
                  })
                }
                placeholder="Channels (comma separated)"
              />
              <select
                value={selectedNotification?.status ? 'Active' : 'Inactive'}
                onChange={(e) =>
                  setSelectedNotification({
                    ...selectedNotification,
                    status: e.target.value === 'Active',
                  })
                }
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <div className="modal-actions">
                <button className="comm-btn gray" onClick={() => setModalOpen(false)}>
                  Cancel
                </button>
                <button className="comm-btn green" onClick={handleSave}>
                  {selectedNotification?.id ? 'Update' : 'Create'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EventNotifications;
