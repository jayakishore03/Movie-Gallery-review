import React, { useState } from 'react';
import './CommunicationTools.css';

const CommunicationSettings = () => {
  const [settings, setSettings] = useState({
    email: true,
    inApp: true,
    sms: false,
    signature: 'Regards,\nRecruitment Team',
    autoResponse: false,
    autoMessage: '',
    language: 'English'
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    alert('✅ Settings saved successfully!');
    console.log(settings);
  };

  return (
    <div className="comm-page">
      <h2>⚙️ Communication Settings</h2>

      <div className="settings-box">
        <h4>📡 Preferred Channels</h4>
        <label><input type="checkbox" checked={settings.email} onChange={(e) => updateSetting('email', e.target.checked)} /> Email</label>
        <label><input type="checkbox" checked={settings.inApp} onChange={(e) => updateSetting('inApp', e.target.checked)} /> In-App Notifications</label>
        <label><input type="checkbox" checked={settings.sms} onChange={(e) => updateSetting('sms', e.target.checked)} /> SMS</label>

        <h4>📝 Signature</h4>
        <textarea
          rows="3"
          value={settings.signature}
          onChange={(e) => updateSetting('signature', e.target.value)}
        ></textarea>

        <h4>🤖 Auto-Response</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.autoResponse}
            onChange={(e) => updateSetting('autoResponse', e.target.checked)}
          />
          Enable Auto-Reply for Candidate Messages
        </label>

        {settings.autoResponse && (
          <textarea
            rows="3"
            placeholder="Enter auto-reply message..."
            value={settings.autoMessage}
            onChange={(e) => updateSetting('autoMessage', e.target.value)}
          ></textarea>
        )}

        <h4>🌐 Language</h4>
        <select
          value={settings.language}
          onChange={(e) => updateSetting('language', e.target.value)}
        >
          <option>English</option>
          <option>Hindi</option>
          <option>Telugu</option>
        </select>

        <button className="comm-btn green" onClick={handleSave}>Save Settings</button>
      </div>
    </div>
  );
};

export default CommunicationSettings;
