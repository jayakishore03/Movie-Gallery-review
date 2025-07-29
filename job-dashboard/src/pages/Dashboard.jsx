import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const [recruiter, setRecruiter] = useState({});
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const session = localStorage.getItem("session");
    if (!session) navigate("/login");

    const storedRecruiter = JSON.parse(localStorage.getItem("recruiter"));
    setRecruiter(storedRecruiter || {});

    const postedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(postedJobs);
  }, [navigate]);

  const handlePostJob = () => navigate("/post-job");

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure to delete this job?")) return;
    const updatedJobs = jobs.filter((job) => job.id !== id);
    localStorage.setItem("jobs", JSON.stringify(updatedJobs));
    setJobs(updatedJobs);
  };

  const handleEdit = (job) => navigate("/post-job", { state: { job } });

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h2>Welcome, {recruiter.name}</h2>
        <button onClick={handlePostJob} style={styles.postBtn}>+ Post New Job</button>
      </div>

      <h3 style={styles.sectionTitle}>📋 Your Posted Jobs</h3>

      <div style={styles.jobGrid}>
        {jobs.length === 0 ? (
          <p>No jobs posted yet.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={styles.card}>
              <h4>{job.title}</h4>
              <p><strong>Company:</strong> {job.companyName}</p>
              <p><strong>Location:</strong> {job.location}</p>
              <p><strong>Date:</strong> {job.date}</p>
              <p><strong>Salary:</strong> {job.salaryRange}</p>
              <p><strong>Skills:</strong> {job.skills}</p>

              <div style={styles.btnRow}>
                <button onClick={() => handleEdit(job)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDelete(job.id)} style={styles.delBtn}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    padding: "30px",
    background: "#f6f7fb",
    minHeight: "100vh",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px",
  },
  postBtn: {
    padding: "10px 20px",
    backgroundColor: "#304352",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  sectionTitle: {
    fontSize: "20px",
    marginBottom: "15px",
  },
  jobGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "white",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  btnRow: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "15px",
  },
  editBtn: {
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
  delBtn: {
    backgroundColor: "#dc3545",
    color: "white",
    border: "none",
    padding: "6px 12px",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

