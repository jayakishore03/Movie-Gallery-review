// src/components/Dashboard.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const companyLogos = [
  {
    name: 'Google',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
  },
  {
    name: 'Amazon',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
  },
  {
    name: 'Microsoft',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg',
  },
  {
    name: 'Facebook',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg',
  },
  {
    name: 'Apple',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
  },
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    name: 'Tesla',
    logo: 'https://images.seeklogo.com/logo-png/32/2/tesla-logo-png_seeklogo-329764.png',
  },
];

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      <div className="section-box">
        <h2>Create New Job / Internship Posting</h2>
        <p>Fill in the details to create a new job opportunity</p>
        <Link to="/post-job">
          <button className="post-btn">Post a Job</button>
        </Link>
      </div>

      <div className="company-logos-section">
        <h2>Top Companies Hiring</h2>
        <div className="logo-grid">
          {companyLogos.map((company, index) => (
            <div key={index} className="logo-card">
              <img src={company.logo} alt={company.name} />
              <p>{company.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;




