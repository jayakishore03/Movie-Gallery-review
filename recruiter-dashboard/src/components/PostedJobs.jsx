import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PostedJobs.css';
import axios from 'axios';

function PostedJobs() {
  const [postedJobs, setPostedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPostedJobs();
  }, []);

  const fetchPostedJobs = async () => {
    try {
      const response = await axios.get('http://localhost:5000/posted-jobs');
      setPostedJobs(response.data);
    } catch (error) {
      console.error('Error fetching posted jobs:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/job/${id}`);
      setPostedJobs(prev => prev.filter(job => job.id !== id));
    } catch (error) {
      console.error('❌ Failed to delete job:', error);
      alert('Failed to delete job');
    }
  };

  const handleEdit = (job) => {
    navigate('/post-job', { state: { jobData: job } });
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  return (
    <div className="section-box">
      <button onClick={handleBack} style={styles.backBtn}>⬅ Back to Dashboard</button>
      <h2>Posted Jobs</h2>

      {postedJobs.length === 0 ? (
        <p>No jobs posted yet.</p>
      ) : (
        postedJobs.map((job) => (
          <div key={job.id} className="job-card" style={{ cursor: 'pointer' }}>
            <div onClick={() => navigate(`/job/${job.id}`)} className="job-clickable">
              <img
                src={job.logo || 'https://via.placeholder.com/60'}
                alt="logo"
                style={{ width: '60px', height: '60px', borderRadius: '8px' }}
              />
              <div style={{ marginLeft: '12px' }}>
                <h3>{job.jobTitle}</h3>
                <p><strong>Location:</strong> {job.location || 'N/A'}</p>
                <p><strong>Salary:</strong> {job.salary || 'N/A'}</p>
              </div>
            </div>

            <div className="button-group">
              <button onClick={() => handleEdit(job)} title="Edit Job">
                <img
                  src="https://www.clker.com/cliparts/B/l/1/P/z/N/edit-icon-hi.png"
                  alt="Edit"
                  className="icon-btn"
                />
              </button>
              <button onClick={() => handleDelete(job.id)} title="Delete Job">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                  alt="Delete"
                  className="icon-btn"
                />
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  backBtn: {
    margin: '10px 0',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer'
  }
};

export default PostedJobs;
