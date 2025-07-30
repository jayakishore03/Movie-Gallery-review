import React, { useState } from 'react';
import './CommunicationTools.css';

const initialMessages = [
  {
    id: 1,
    title: 'Hackathon Reminder',
    audience: 'All Students',
    channel: 'Email',
    content: 'Join our upcoming virtual hackathon on July 20th.',
    status: 'Sent',
    time: '2025-07-08 10:30 AM'
  },
  {
    id: 2,
    title: 'Interview Drive Notification',
    audience: 'Shortlisted Candidates',
    channel: 'Email + In-app',
    content: 'You’ve been selected for the next interview round!',
    status: 'Scheduled',
    time: '2025-07-10 09:00 AM'
  }
];

const BroadcastMessages = () => {
  const [messages, setMessages] = useState(initialMessages);
  const [form, setForm] = useState({
    title: '', content: '', audience: 'All Students', channel: 'Email'
  });

  const handleSend = () => {
    const newMessage = {
      id: messages.length + 1,
      ...form,
      status: 'Sent',
      time: new Date().toLocaleString()
    };
    setMessages([newMessage, ...messages]);
    setForm({ title: '', content: '', audience: 'All Students', channel: 'Email' });
  };

  return (
    <div className="comm-page">
      <h2>📢 Broadcast Messages</h2>

      <div className="broadcast-form">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />
        <select
          value={form.audience}
          onChange={(e) => setForm({ ...form, audience: e.target.value })}
        >
          <option>All Students</option>
          <option>Applicants</option>
          <option>Shortlisted</option>
        </select>
        <select
          value={form.channel}
          onChange={(e) => setForm({ ...form, channel: e.target.value })}
        >
          <option>Email</option>
          <option>In-app</option>
          <option>Email + In-app</option>
        </select>
        <textarea
          rows="4"
          placeholder="Message Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
        ></textarea>
        <button className="comm-btn green" onClick={handleSend}>Send Message</button>
      </div>

      <h3 style={{ marginTop: '30px' }}>📜 Message History</h3>
      <table className="trigger-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Audience</th>
            <th>Channel</th>
            <th>Status</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {messages.map(msg => (
            <tr key={msg.id}>
              <td>{msg.title}</td>
              <td>{msg.audience}</td>
              <td>{msg.channel}</td>
              <td>{msg.status}</td>
              <td>{msg.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BroadcastMessages;
