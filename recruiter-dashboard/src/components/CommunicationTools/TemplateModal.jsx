// src/components/CommunicationTools/TemplateModal.jsx
import React from 'react';
import './CommunicationTools.css';

const TemplateModal = ({ onClose, onSave, name, type, content, setName, setType, setContent }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create Template</h3>
        <input
          type="text"
          placeholder="Template Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option>Email</option>
          <option>In-app</option>
        </select>
        <textarea
          placeholder="Template Content"
          rows="4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="modal-buttons">
          <button onClick={onSave} className="comm-btn green">Save</button>
          <button onClick={onClose} className="comm-btn red">Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
