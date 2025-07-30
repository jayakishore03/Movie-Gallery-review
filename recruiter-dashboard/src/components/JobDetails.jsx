import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './JobDetails.css';

function JobDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5000/job/${id}`)
      .then((res) => {
        setJob(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching job:', err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!job) return <div style={{ padding: '20px' }}>Job not found</div>;

  return (
    <div className="job-details-container">
      <button onClick={() => navigate('/posted-jobs')} className="back-btn">
        ⬅ Back to Posted Jobs
      </button>

      <div className="job-header">
        <img
          src={job.logo || 'https://via.placeholder.com/80'}
          alt="logo"
          className="job-logo-small"
        />
        <div>
          <h2>{job.jobTitle}</h2>
          <p><strong>Location:</strong> {job.location || 'Not specified'}</p>
          <p><strong>Salary:</strong> {job.salary || 'N/A'}</p>
        </div>
      </div>

      <div className="job-section">
        <h3>Description</h3>
        <p>{job.description}</p>
      </div>

      <div className="job-section">
        <h3>Requirements</h3>
        <p><strong>Skills:</strong> {job.skills}</p>
        <p><strong>Tech Stack:</strong> {job.techStack}</p>
        <p><strong>CGPA:</strong> {job.cgpa}</p>
        <p><strong>Branch:</strong> {job.branch}</p>
        <p><strong>Year:</strong> {job.year}</p>
      </div>

      <div className="job-section">
        <h3>Visibility & Filters</h3>
        <p><strong>Visibility:</strong> {job.visibility}</p>
        {job.visibility === 'filtered' && (
          <p><strong>Colleges:</strong> {job.colleges}</p>
        )}
      </div>
    </div>
  );
}

export default JobDetails;
