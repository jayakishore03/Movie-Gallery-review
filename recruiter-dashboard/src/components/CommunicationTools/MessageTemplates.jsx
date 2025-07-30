// src/components/CommunicationTools/MessageTemplates.jsx
import React, { useState } from 'react';
import './MessageTemplates.css';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';

const initialTemplates = [
  {
    id: 1,
    name: 'Interview Invitation',
    type: 'Email',
    status: 'Active',
    lastUpdated: '2025-07-08',
    content: 'Dear [Candidate], you are invited to an interview at [Company].'
  },
  {
    id: 2,
    name: 'Offer Letter',
    type: 'Email + PDF',
    status: 'Inactive',
    lastUpdated: '2025-07-07',
    content: 'Congratulations! Please find the attached offer letter from [Company].'
  },
  {
    id: 3,
    name: 'Application Acknowledgement',
    type: 'Email',
    status: 'Active',
    lastUpdated: '2025-07-09',
    content: 'Thank you for applying. We have received your application.'
  }
];

const MessageTemplates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [modalOpen, setModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    type: '',
    status: 'Active',
    content: ''
  });

  const handleNew = () => {
    setFormData({ id: null, name: '', type: '', status: 'Active', content: '' });
    setIsEditing(false);
    setModalOpen(true);
  };

  const handleEdit = (template) => {
    setFormData(template);
    setIsEditing(true);
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setTemplates(templates.filter(t => t.id !== id));
  };

  const handleSave = async () => {
    try {
      const payload = {
        name: formData.name,
        type: formData.type,
        status: formData.status,
        last_updated: new Date().toISOString().split('T')[0],
        content: formData.content
      };

      // POST request to backend
      await axios.post('http://localhost:5000/api/message-templates', payload);

      if (isEditing) {
        setTemplates(prev =>
          prev.map(t => (t.id === formData.id ? formData : t))
        );
      } else {
        const newId = templates.length ? Math.max(...templates.map(t => t.id)) + 1 : 1;
        const newTemplate = {
          ...formData,
          id: newId,
          lastUpdated: payload.last_updated
        };
        setTemplates(prev => [...prev, newTemplate]);
      }

      setModalOpen(false);
    } catch (error) {
      console.error('❌ Error saving message template:', error.message);
    }
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
        <h2>📄 Message Templates</h2>
        <button className="comm-btn green" onClick={handleNew}>+ New Template</button>
      </div>

      <div className="template-container grid">
        <AnimatePresence>
          {templates.map((template) => (
            <motion.div
              key={template.id}
              className="template-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
            >
              <h4>📩 {template.name}</h4>
              <p>
                <span className={`badge ${template.type.includes('PDF') ? 'pdf' : 'email'}`}>{template.type}</span>
                <span className={`badge ${template.status === 'Active' ? 'active' : 'inactive'}`}>{template.status}</span>
              </p>
              <p><strong>Last Updated:</strong> {template.lastUpdated}</p>
              <div className="card-actions">
                <button className="comm-btn orange" onClick={() => handleEdit(template)}>Edit</button>
                <button className="comm-btn red" onClick={() => handleDelete(template.id)}>Delete</button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {modalOpen && (
        <div className="modal-overlay">
          <motion.div
            className="modal-box"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3>{isEditing ? 'Edit Template' : 'New Template'}</h3>
            <input
              type="text"
              placeholder="Template Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Type (Email, Email + PDF)"
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            />
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <textarea
              rows="4"
              placeholder="Template Content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            />
            <div className="modal-actions">
              <button className="comm-btn gray" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="comm-btn green" onClick={handleSave}>
                {isEditing ? 'Update' : 'Create'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default MessageTemplates;
