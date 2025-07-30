import React, { useState } from 'react';
import './CommunicationTools.css';

const candidates = [
  { id: 1, name: 'Rahul Sharma' },
  { id: 2, name: 'Aaradhya Verma' },
  { id: 3, name: 'Kunal Mehta' }
];

const sampleMessages = {
  1: [
    { sender: 'student', text: 'Hello sir, is my resume selected?', time: '9:45 AM' },
    { sender: 'recruiter', text: 'Yes Rahul, you’re shortlisted!', time: '9:47 AM' }
  ],
  2: [
    { sender: 'student', text: 'Can I apply for multiple jobs?', time: 'Yesterday' }
  ],
  3: []
};

const CandidateInbox = () => {
  const [selectedId, setSelectedId] = useState(1);
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { sender: 'recruiter', text: input, time: 'Just now' };
    setMessages(prev => ({
      ...prev,
      [selectedId]: [...(prev[selectedId] || []), newMsg]
    }));
    setInput('');
  };

  return (
    <div className="inbox-page">
      <div className="inbox-sidebar">
        <h3>📬 Inbox</h3>
        {candidates.map(c => (
          <div
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`candidate-item ${selectedId === c.id ? 'active' : ''}`}
          >
            {c.name}
          </div>
        ))}
      </div>

      <div className="inbox-chat">
        <div className="chat-header">
          Chat with <strong>{candidates.find(c => c.id === selectedId).name}</strong>
        </div>
        <div className="chat-body">
          {(messages[selectedId] || []).map((msg, i) => (
            <div key={i} className={`chat-msg ${msg.sender}`}>
              <div className="bubble">{msg.text}</div>
              <span className="timestamp">{msg.time}</span>
            </div>
          ))}
        </div>
        <div className="chat-input">
          <input
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage} className="comm-btn green">Send</button>
        </div>
      </div>
    </div>
  );
};

export default CandidateInbox;
