import React, { useState } from 'react';
import './PostJob.css';

const PostJob = () => {
  const [visibleSection, setVisibleSection] = useState(null);
  const [formData, setFormData] = useState({
    jobTitle: '',
    jobId: '',
    description: '',
    skills: '',
    techStack: '',
    cgpa: '',
    branch: '',
    year: '',
    visibility: 'all',
    college: ''
  });

  const toggleSection = (section) => {
    setVisibleSection(visibleSection === section ? null : section);
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = () => {
    const postedJobs = JSON.parse(localStorage.getItem('postedJobs')) || [];
    postedJobs.push(formData);
    localStorage.setItem('postedJobs', JSON.stringify(postedJobs));
    alert('Job posted!');
    setFormData({
      jobTitle: '', jobId: '', description: '', skills: '',
      techStack: '', cgpa: '', branch: '', year: '',
      visibility: 'all', college: ''
    });
    setVisibleSection(null);
  };

  return (
    <div className="postjob-container">
      <h2>Post a New Job</h2>

      <div className="toggle-box" onClick={() => toggleSection('basic')}>
        1️⃣ Basic Details
      </div>
      {visibleSection === 'basic' && (
        <div className="section-content">
          <label>Job Title: <input name="jobTitle" value={formData.jobTitle} onChange={handleChange} /></label>
          <label>Job ID: <input name="jobId" value={formData.jobId} onChange={handleChange} /></label>
          <label>Description: <textarea name="description" value={formData.description} onChange={handleChange} /></label>
        </div>
      )}

      <div className="toggle-box" onClick={() => toggleSection('requirements')}>
        2️⃣ Requirements
      </div>
      {visibleSection === 'requirements' && (
        <div className="section-content">
          <label>Required Skills: <input name="skills" value={formData.skills} onChange={handleChange} /></label>
          <label>Tech Stack: <input name="techStack" value={formData.techStack} onChange={handleChange} /></label>
          <label>Minimum CGPA: <input name="cgpa" value={formData.cgpa} onChange={handleChange} /></label>
          <label>Branch: <input name="branch" value={formData.branch} onChange={handleChange} /></label>
          <label>Year of Study: <input name="year" value={formData.year} onChange={handleChange} /></label>
        </div>
      )}

      <div className="toggle-box" onClick={() => toggleSection('visibility')}>
        3️⃣ Visibility & Filters
      </div>
      {visibleSection === 'visibility' && (
        <div className="section-content">
          <label>
            <input type="radio" name="visibility" value="all" checked={formData.visibility === 'all'} onChange={handleChange} />
            Open to All Students
          </label>
          <label>
            <input type="radio" name="visibility" value="filtered" checked={formData.visibility === 'filtered'} onChange={handleChange} />
            Filtered Colleges
          </label>
          {formData.visibility === 'filtered' && (
            <label>College Name: <input name="college" value={formData.college} onChange={handleChange} /></label>
          )}
        </div>
      )}

      <div style={{ marginTop: '2rem' }}>
        <button className="submit-btn" onClick={handleSubmit}>Submit Job</button>
      </div>
    </div>
  );
};

export default PostJob;

