import React, { useState } from 'react';
import './CommunicationTools.css';

const TemplateModal = ({ data, onClose }) => {
  const [content, setContent] = useState(data.content || '');

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h3>{data.name ? '📄 Preview Template' : '➕ Create New Template'}</h3>

        <textarea
          rows="8"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter message content..."
        ></textarea>

        <div className="modal-actions">
          <button onClick={onClose} className="comm-btn gray">Close</button>
          <button className="comm-btn green">Save</button>
        </div>
      </div>
    </div>
  );
};

export default TemplateModal;
