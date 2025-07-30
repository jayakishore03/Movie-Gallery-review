import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import students from '../data/students';
import './StudentProfiles.css';

const StudentProfileDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const student = students.find((s) => s.id === parseInt(id));

  if (!student) {
    return <p>Student not found.</p>;
  }

  const calculateScore = (s) => {
    return ((s.resumeScore * 2 + s.aptitudeScore / 10 + s.communication * 1.5) / 3).toFixed(2);
  };

  return (
    <div className="student-profile-detail">
      <h2>👤 {student.name}'s Profile</h2>
      <p><strong>Email:</strong> {student.email}</p>
      <p><strong>Skills:</strong> {student.skills.join(', ')}</p>
      <p><strong>Resume Score:</strong> {student.resumeScore}/10</p>
      <p><strong>Aptitude Score:</strong> {student.aptitudeScore}%</p>
      <p><strong>Communication:</strong> {student.communication}/10</p>
      <p><strong>Overall Score:</strong> {calculateScore(student)}</p>
      <p><strong>Applied Jobs:</strong> {student.appliedJobs.join(', ')}</p>
      <button onClick={() => navigate(-1)}>🔙 Go Back</button>
    </div>
  );
};

export default StudentProfileDetail;
