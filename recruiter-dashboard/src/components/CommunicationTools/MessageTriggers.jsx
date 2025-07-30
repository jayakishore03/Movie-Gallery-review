// src/components/CommunicationTools/MessageTriggers.jsx
import React, { useState } from 'react';
import './CommunicationTools.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const MessageTriggers = () => {
  const [triggers, setTriggers] = useState([
    { id: 1, name: 'Application Received', type: 'Email', status: 'Active', lastSent: '2 hours ago' },
    { id: 2, name: 'Document Request', type: 'Email + In-app', status: 'Active', lastSent: '1 day ago' },
    { id: 3, name: 'Shortlisted Notification', type: 'In-app', status: 'Inactive', lastSent: '3 days ago' }
  ]);

  const [editingTrigger, setEditingTrigger] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const handleEdit = (trigger) => {
    setEditingTrigger({ ...trigger });
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleNew = () => {
    setEditingTrigger({
      id: Date.now(),
      name: '',
      type: '',
      status: 'Active',
      lastSent: 'Just now'
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTrigger(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: editingTrigger.name,
        type: editingTrigger.type,
        status: editingTrigger.status,
        last_sent: editingTrigger.lastSent || 'Just now'
      };

      await axios.post('http://localhost:5000/api/message-triggers', payload);

      if (isEditMode) {
        setTriggers(prev =>
          prev.map(t => (t.id === editingTrigger.id ? editingTrigger : t))
        );
      } else {
        setTriggers(prev => [...prev, editingTrigger]);
      }

      setShowModal(false);
    } catch (error) {
      console.error('❌ Error saving message trigger:', error.message);
    }
  };

  const handleDelete = (id) => {
    setTriggers(triggers.filter(t => t.id !== id));
  };

  return (
    <motion.div
      className="comm-page"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="comm-header">
        <h2>⚡ Message Triggers</h2>
        <button className="comm-btn green" onClick={handleNew}>+ New Trigger</button>
      </div>

      <div className="template-container grid">
        <AnimatePresence>
          {triggers.map((trigger) => (
            <motion.div
              key={trigger.id}
              className="template-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h4>{trigger.name}</h4>
              <p>
                <span className={`badge ${trigger.type.includes('In-app') ? 'email' : 'pdf'}`}>{trigger.type}</span>
                <span className={`badge ${trigger.status === 'Active' ? 'active' : 'inactive'}`}>{trigger.status}</span>
              </p>
              <p><strong>Last Sent:</strong> {trigger.lastSent}</p>
              <div className="card-actions">
                <button className="comm-btn orange" onClick={() => handleEdit(trigger)}>Edit</button>
                <button className="comm-btn red" onClick={() => handleDelete(trigger.id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {showModal && editingTrigger && (
        <div className="modal-overlay">
          <motion.div
            className="modal-box"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{isEditMode ? 'Edit Trigger' : 'New Trigger'}</h3>
            <input
              type="text"
              name="name"
              value={editingTrigger.name}
              onChange={handleChange}
              placeholder="Trigger Name"
            />
            <textarea
              name="type"
              value={editingTrigger.type}
              onChange={handleChange}
              placeholder="Type (e.g. Email, In-app)"
            />
            <select
              name="status"
              value={editingTrigger.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <div className="modal-actions">
              <button className="comm-btn gray" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="comm-btn green" onClick={handleSave}>Save</button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default MessageTriggers;
