import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './JobPosting.css';
import axios from 'axios';

function JobPosting() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    navigate('/dashboard');
  };

  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    jobTitle: '',
    jobId: '',
    description: '',
    salary: '',
    location: '',
    logo: '',
    skills: '',
    techStack: '',
    cgpa: '',
    branch: '',
    year: '',
    visibility: 'all',
    colleges: '',
  });

  // ✅ Pre-fill form if jobData is passed from edit
  useEffect(() => {
    if (location.state?.jobData) {
      setFormData(location.state.jobData);
    }
  }, [location.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // ✅ Final handleSubmit with conditional PUT or POST
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (location.state?.jobData?.id) {
        // Update existing job
        await axios.put(`http://localhost:5000/job/${location.state.jobData.id}`, formData);
        alert('Job updated successfully!');
      } else {
        // Create new job
        await axios.post('http://localhost:5000/job-posting', formData);
        alert('Job submitted successfully!');
      }

      navigate('/posted-jobs');
    } catch (err) {
      console.error('Job submission failed:', err);
      alert('Job submission failed.');
    }
  };

  return (
    <div className="job-posting-advanced">
      <button onClick={handleBack} style={styles.backBtn}>⬅ Back to Dashboard</button>

      <div className="job-posting-header">
        <h2>{location.state?.jobData ? 'Edit Job Posting' : 'Create New Job/Internship Posting'}</h2>
        <p>Fill in the details to {location.state?.jobData ? 'edit' : 'create'} a job opportunity</p>
      </div>

      <div className="step-tab-container">
        <div className={`step-tab ${step === 1 ? 'active' : ''}`} style={{ backgroundColor: '#007BFF' }} onClick={() => setStep(1)}>
          Basic Details
        </div>
        <div className={`step-tab ${step === 2 ? 'active' : ''}`} style={{ backgroundColor: '#28A745' }} onClick={() => setStep(2)}>
          Requirements
        </div>
        <div className={`step-tab ${step === 3 ? 'active' : ''}`} style={{ backgroundColor: '#6F42C1' }} onClick={() => setStep(3)}>
          Visibility & Filters
        </div>
      </div>

      <form className="job-form-advanced" onSubmit={handleSubmit}>
        {step === 1 && (
          <div className="form-card blue-card">
            <h3>Basic Details</h3>
            <label>Job Title</label>
            <input name="jobTitle" onChange={handleChange} value={formData.jobTitle} required />

            <label>Job ID</label>
            <input name="jobId" onChange={handleChange} value={formData.jobId} required />

            <label>Description</label>
            <textarea name="description" rows="4" onChange={handleChange} value={formData.description}></textarea>

            <label>Salary</label>
            <input name="salary" type="text" placeholder="e.g. ₹40,000/month or 5 LPA" onChange={handleChange} value={formData.salary} />

            <label>Location</label>
            <input name="location" type="text" placeholder="e.g. Bangalore" onChange={handleChange} value={formData.location} />

            <label>Company Logo URL</label>
            <input name="logo" type="text" placeholder="https://..." onChange={handleChange} value={formData.logo} />
          </div>
        )}

        {step === 2 && (
          <div className="form-card green-card">
            <h3>Requirements</h3>
            <label>Required Skills</label>
            <input name="skills" onChange={handleChange} value={formData.skills} />

            <label>Tech Stack</label>
            <input name="techStack" onChange={handleChange} value={formData.techStack} />

            <label>Minimum CGPA</label>
            <input name="cgpa" onChange={handleChange} value={formData.cgpa} />

            <label>Branch</label>
            <input name="branch" onChange={handleChange} value={formData.branch} />

            <label>Year of Study</label>
            <input name="year" onChange={handleChange} value={formData.year} />
          </div>
        )}

        {step === 3 && (
          <div className="form-card purple-card">
            <h3>Visibility & Filters</h3>
            <label>Visibility</label>
            <select name="visibility" onChange={handleChange} value={formData.visibility}>
              <option value="all">Open to All Students</option>
              <option value="filtered">Filter by College</option>
            </select>

            {formData.visibility === 'filtered' && (
              <>
                <label>Colleges (comma-separated)</label>
                <input name="colleges" onChange={handleChange} value={formData.colleges} />
              </>
            )}
          </div>
        )}

        <div className="button-set">
          {step > 1 && <button type="button" onClick={prevStep}>⬅ Back</button>}
          {step < 3 && <button type="button" onClick={nextStep}>Next ➡</button>}
          {step === 3 && <button type="submit">{location.state?.jobData ? 'Update Job' : 'Submit Job'}</button>}
        </div>
      </form>
    </div>
  );
}

const styles = {
  backBtn: {
    marginBottom: '15px',
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    float: 'left'
  }
};

export default JobPosting;
