// src/components/StudentDetail.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentDetail.css';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import GestScoresChart from './GestScoresChart'; // ✅ Import custom GEST Chart

const StudentDetail = () => {
  const navigate = useNavigate();
  const student = JSON.parse(localStorage.getItem('selectedStudent'));

  if (!student) {
    return (
      <div className="student-detail">
        <h2>No student selected</h2>
        <button onClick={() => navigate('/students')}>⬅ Back to Profiles</button>
      </div>
    );
  }

  return (
    <div className="student-detail">
      <button onClick={() => navigate('/students')} className="back-btn">⬅ Back to Profiles</button>
      <h2>{student.name}'s Detailed Profile</h2>

      {/* Profile Picture and Resume */}
      <div className="section-box section-gray">
        <img src={student.profilePic} alt="Profile" className="profile-pic" />
        <p><strong>Email:</strong> {student.email}</p>
        <p><strong>Resume:</strong> <a href={student.resume} target="_blank" rel="noreferrer">View Resume</a></p>
      </div>

      {/* Coding Scores - Bar Chart */}
      <div className="section-box section-blue">
        <h3>Coding Scores (Bar Chart)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={Object.entries(student.codingScores).map(([name, score]) => ({ name, score }))}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" fill="#ffcc00" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* GEST Scores - Custom Bar Chart with colors */}
      <div className="section-box section-purple">
        <h3>GEST Scores (Graph)</h3>
        <GestScoresChart scores={student.gestScores} />
      </div>

      {/* Certifications */}
      <div className="section-box section-green">
        <h3>Certifications</h3>
        <ul>
          {student.certifications.map((cert, i) => (
            <li key={i}>{cert}</li>
          ))}
        </ul>
      </div>

      {/* Projects */}
      <div className="section-box section-yellow">
        <h3>Projects</h3>
        <ul>
          {student.projects.map((proj, i) => (
            <li key={i}>
              <strong>{proj.title}</strong>: {proj.description}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div className="section-box section-orange">
        <h3>Skills</h3>
        <p>{student.skills.join(', ')}</p>
      </div>
    </div>
  );
};

export default StudentDetail;




