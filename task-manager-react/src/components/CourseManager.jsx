import React, { useState, useEffect } from "react";
import "./CourseManager.css";

const predefinedCourses = [
  "Machine Learning",
  "Deep Learning",
  "Artificial Intelligence",
  "Python",
  "Java",
  "HTML",
  "CSS",
  "AWS",
  "DevOps",
  "Cyber Security",
  "Cloud Computing",
  "Data Structures"
];

const statusOptions = ["Started", "In Progress", "Completed"];

const CourseManager = () => {
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("courses");
    if (saved) return JSON.parse(saved);

    return predefinedCourses.map((title, index) => ({
      id: index + 1,
      title,
      status: ""
    }));
  });

  useEffect(() => {
    localStorage.setItem("courses", JSON.stringify(courses));
  }, [courses]);

  const updateStatus = (id, newStatus) => {
    const updated = courses.map((course) =>
      course.id === id ? { ...course, status: newStatus } : course
    );
    setCourses(updated);
  };

  return (
    <div className="course-app">
      <h1>📘 Course Progress Tracker</h1>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            <span className="course-title">{course.title}</span>
            <div className="dropdown-wrapper">
              <button className={`status-btn ${course.status.replace(" ", "")}`}>
                {course.status || "Select Status"}
              </button>
              <div className="dropdown-menu">
                {statusOptions.map((status, index) => (
                  <div
                    key={index}
                    className="dropdown-item"
                    onClick={() => updateStatus(course.id, status)}
                  >
                    {status}
                  </div>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseManager;



