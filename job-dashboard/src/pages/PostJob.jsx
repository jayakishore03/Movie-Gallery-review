import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function PostJob() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    companyName: "",
    website: "",
    logo: "",
    title: "",
    location: "",
    duration: "",
    description: "",
    skills: "",
    salaryRange: "",
    perks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step < 5) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSubmit = () => {
    const jobs = JSON.parse(localStorage.getItem("jobs")) || [];
    const newJob = {
      ...form,
      id: Date.now(),
      date: new Date().toLocaleDateString(),
    };
    localStorage.setItem("jobs", JSON.stringify([...jobs, newJob]));
    navigate("/dashboard");
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>📝 Post a Job</h2>
      <div style={{ marginBottom: "20px" }}>Step {step} of 5</div>

      {step === 1 && (
        <>
          <input name="companyName" placeholder="Company Name" value={form.companyName} onChange={handleChange} style={inputStyle} />
          <input name="website" placeholder="Website" value={form.website} onChange={handleChange} style={inputStyle} />
          <input name="logo" placeholder="Company Logo URL" value={form.logo} onChange={handleChange} style={inputStyle} />
        </>
      )}

      {step === 2 && (
        <>
          <input name="title" placeholder="Job Title" value={form.title} onChange={handleChange} style={inputStyle} />
          <input name="location" placeholder="Location (remote/hybrid/onsite)" value={form.location} onChange={handleChange} style={inputStyle} />
          <input name="duration" placeholder="Duration" value={form.duration} onChange={handleChange} style={inputStyle} />
        </>
      )}

      {step === 3 && (
        <>
          <textarea name="description" placeholder="Job Description" value={form.description} onChange={handleChange} style={textAreaStyle} />
          <input name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} style={inputStyle} />
        </>
      )}

      {step === 4 && (
        <>
          <input name="salaryRange" placeholder="Salary Range" value={form.salaryRange} onChange={handleChange} style={inputStyle} />
          <input name="perks" placeholder="Perks / Benefits" value={form.perks} onChange={handleChange} style={inputStyle} />
        </>
      )}

      {step === 5 && (
        <div style={previewBox}>
          <h3>📋 Preview</h3>
          {Object.entries(form).map(([key, value]) => (
            <p key={key}><strong>{key}:</strong> {value}</p>
          ))}
        </div>
      )}

      <div style={{ marginTop: "20px" }}>
        {step > 1 && <button onClick={handleBack} style={buttonStyle}>← Back</button>}
        {step < 5 && <button onClick={handleNext} style={buttonStyle}>Next →</button>}
        {step === 5 && <button onClick={handleSubmit} style={submitBtn}>✅ Submit</button>}
      </div>
    </div>
  );
}

const inputStyle = {
  display: "block",
  marginBottom: "15px",
  padding: "10px",
  width: "100%",
  maxWidth: "500px",
  borderRadius: "5px",
  border: "1px solid #ccc",
};

const textAreaStyle = {
  ...inputStyle,
  height: "80px",
};

const buttonStyle = {
  marginRight: "10px",
  padding: "10px 20px",
  border: "none",
  backgroundColor: "#304352",
  color: "#fff",
  borderRadius: "5px",
  cursor: "pointer",
};

const submitBtn = {
  ...buttonStyle,
  backgroundColor: "#28a745",
};

const previewBox = {
  backgroundColor: "#f4f4f4",
  padding: "20px",
  borderRadius: "8px",
  width: "100%",
  maxWidth: "500px",
};


