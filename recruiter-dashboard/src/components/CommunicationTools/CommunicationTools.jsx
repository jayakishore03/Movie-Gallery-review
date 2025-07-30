import React, { useState } from 'react';
import MessageTriggers from './MessageTriggers';
import EventNotifications from './EventNotifications';
import './CommunicationTools.css';
//import MessageTemplates from './MessageTemplates';


const MessageTemplates = ({ templates, onNewTemplate, onEdit, onDelete }) => (
  <div className="templates-section">
    <div className="templates-header">
      <h2>📄 Message Templates</h2>
      <button onClick={onNewTemplate}>+ New Template</button>
    </div>

    <div className="templates-grid">
      {templates.map((t) => (
        <div key={t.id} className="template-card">
          <h3>{t.title}</h3>
          <p><strong>Subject:</strong> {t.subject}</p>
          <p>{t.body}</p>
          <div className="template-buttons">
            <button className="edit-btn" onClick={() => onEdit(t.id)}>Edit</button>
            <button className="delete-btn" onClick={() => onDelete(t.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const CommunicationTools = () => {
  const [activeTab, setActiveTab] = useState('templates');
  const [templates, setTemplates] = useState([
    {
      id: 1,
      title: 'Shortlist Notification',
      subject: "You've been shortlisted",
      body: "Congratulations! You've been shortlisted for...",
    },
    {
      id: 2,
      title: 'Rejection Notice',
      subject: 'Application Update',
      body: 'We regret to inform you...',
    },
  ]);

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ title: '', subject: '', body: '' });

  const addTemplate = (newTemplate) => {
    setTemplates((prev) => [...prev, { ...newTemplate, id: Date.now() }]);
    setActiveTab('templates');
  };

  const deleteTemplate = (id) =>
    setTemplates((prev) => prev.filter((t) => t.id !== id));

  const openEdit = (id) => {
    const template = templates.find((t) => t.id === id);
    if (template) {
      setEditId(id);
      setEditData({ ...template });
    }
  };

  const saveEdit = () => {
    setTemplates((prev) =>
      prev.map((t) => (t.id === editId ? { ...editData, id: editId } : t))
    );
    setEditId(null);
  };

  const closeModal = () => setEditId(null);

  return (
    <div className="comm-container">
      <h1 className="comm-title">🛠️ Communication Tools</h1>

      <div className="tabs">
        <button
          className={activeTab === 'templates' ? 'active' : ''}
          onClick={() => setActiveTab('templates')}
        >
          Message Templates
        </button>
        <button
          className={activeTab === 'triggers' ? 'active' : ''}
          onClick={() => setActiveTab('triggers')}
        >
          Message Triggers
        </button>
        <button
          className={activeTab === 'notifications' ? 'active' : ''}
          onClick={() => setActiveTab('notifications')}
        >
          Event Notifications
        </button>
      </div>

      <div className="tab-content fade-in">
        {activeTab === 'templates' && (
          <MessageTemplates
            templates={templates}
            onNewTemplate={() => setActiveTab('triggers')}
            onEdit={openEdit}
            onDelete={deleteTemplate}
          />
        )}
        {activeTab === 'triggers' && <MessageTriggers onSave={addTemplate} />}
        {activeTab === 'notifications' && <EventNotifications />}
      </div>

      {/* Edit Modal */}
      {editId && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Edit Template</h3>
            <input
              type="text"
              placeholder="Title"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
            />
            <input
              type="text"
              placeholder="Subject"
              value={editData.subject}
              onChange={(e) => setEditData({ ...editData, subject: e.target.value })}
            />
            <textarea
              rows="4"
              placeholder="Body"
              value={editData.body}
              onChange={(e) => setEditData({ ...editData, body: e.target.value })}
            />
            <div className="modal-actions">
              <button className="edit-btn" onClick={saveEdit}>Save</button>
              <button className="delete-btn" onClick={closeModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommunicationTools;
