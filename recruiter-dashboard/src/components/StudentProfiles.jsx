import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentProfiles.css';

function StudentProfiles() {
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const dummy = [
      {
        id: 1,
        name: 'Kiran',
        email: 'kiran@example.com',
        resumeScore: 7.2,
        aptitude: 70,
        skills: ['HTML', 'CSS', 'JavaScript'],
        communication: 6,
        resume: "resume_kiran.pdf",
        profilePic: "https://www.shutterstock.com/image-photo/man-poses-passport-photo-260nw-207377266.jpg",
        codingScores: { DSA: 72, Web: 68, ML: 55 },
        gestScores: { reasoning: 70, quant: 60, english: 65 },
        certifications: ["Frontend Dev"],
        projects: [
          { title: "ToDo App", description: "Basic CRUD app using JS" }
        ]
      },
      {
        id: 2,
        name: 'Karthick',
        email: 'karthick@example.com',
        resumeScore: 8.4,
        aptitude: 82,
        skills: ['Java', 'Spring Boot'],
        communication: 8,
        resume: "resume_karthick.pdf",
        profilePic: "https://www.shutterstock.com/image-photo/passport-photo-portrait-man-on-260nw-2445591631.jpg",
        codingScores: { DSA: 88, Web: 75, ML: 70 },
        gestScores: { reasoning: 85, quant: 77, english: 80 },
        certifications: ["Java Backend"],
        projects: [
          { title: "E-Commerce Backend", description: "Java Spring backend for online shop" }
        ]
      },
      {
        id: 3,
        name: 'Manu',
        email: 'manu@example.com',
        resumeScore: 9.1,
        aptitude: 90,
        skills: ['Python', 'Django', 'ML'],
        communication: 9,
        resume: "resume_manu.pdf",
        profilePic: "https://www.shutterstock.com/image-photo/passport-photo-portrait-man-on-260nw-2445591679.jpg",
        codingScores: { DSA: 91, Web: 82, ML: 93 },
        gestScores: { reasoning: 92, quant: 89, english: 90 },
        certifications: ["AI Expert", "Python Bootcamp"],
        projects: [
          { title: "Loan Prediction", description: "ML model to predict loan approval" },
          { title: "Blog Site", description: "Blog site with Django and SQLite" }
        ]
      },
      {
        id: 4,
        name: 'Durga Rao',
        email: 'durga@example.com',
        resumeScore: 7.8,
        aptitude: 75,
        skills: ['C', 'C++', 'Problem Solving'],
        communication: 7,
        resume: "resume_durga.pdf",
        profilePic: "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2438329737.jpg",
        codingScores: { DSA: 80, Web: 60, ML: 65 },
        gestScores: { reasoning: 78, quant: 72, english: 70 },
        certifications: ["DSA Advanced"],
        projects: [
          { title: "Compiler Design", description: "Mini C compiler in C++" }
        ]
      },
      {
        id: 5,
        name: 'Ravi',
        email: 'ravi@example.com',
        resumeScore: 8.5,
        aptitude: 85,
        skills: ['React', 'Firebase', 'Node.js'],
        communication: 8,
        resume: "resume_ravi.pdf",
        profilePic: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJ49Jz05YlpSl2VMsPyq89Yp_7qWdRo_nuEiBor6Zky3ag5MGFeB0Z5d7izx6a8IerbLQ&usqp=CAU",
        codingScores: { DSA: 79, Web: 90, ML: 66 },
        gestScores: { reasoning: 82, quant: 80, english: 77 },
        certifications: ["Full Stack"],
        projects: [
          { title: "Realtime Chat App", description: "Chat app with React and Firebase" }
        ]
      },
      {
        id: 6,
        name: 'Kishore',
        email: 'kishore@example.com',
        resumeScore: 7.6,
        aptitude: 74,
        skills: ['HTML', 'Python', 'DSA'],
        communication: 7,
        resume: "resume_kishore.pdf",
        profilePic: "https://www.shutterstock.com/image-photo/passport-photo-portrait-young-man-260nw-2437772333.jpg",
        codingScores: { DSA: 80, Web: 67, ML: 70 },
        gestScores: { reasoning: 75, quant: 70, english: 72 },
        certifications: ["Data Structures"],
        projects: [
          { title: "Student Portal", description: "Mini portal to manage students" }
        ]
      }
    ];

    setStudents(dummy);
    localStorage.setItem('students', JSON.stringify(dummy));
  }, []);

  const handleClick = (student) => {
    localStorage.setItem('selectedStudent', JSON.stringify(student));
    navigate(`/student/${student.id}`);
  };

  return (
    <div className="student-profiles-container">
      <h2>Student Profiles</h2>
      <div className="student-grid">
        {students.map((student) => (
          <div
            key={student.id}
            className="student-card"
            onClick={() => handleClick(student)}
          >
            <img
              src={student.profilePic || 'https://via.placeholder.com/100'}
              alt="Profile"
              className="student-pic"
            />
            <h4>{student.name}</h4>
            <p><strong>Resume Score:</strong> {student.resumeScore}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StudentProfiles;









