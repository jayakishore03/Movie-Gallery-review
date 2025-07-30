const express = require('express');
const mysql = require('mysql2'); // using mysql2
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// ✅ MySQL connection setup
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '03082000DFBp$',
  database: 'blackbuck'
});

db.connect((err) => {
  if (err) {
    console.error('❌ MySQL connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to MySQL Database');
});

// ✅ Root test route
app.get('/', (req, res) => {
  res.send('API Running');
});

// ✅ Register route
app.post('/register', (req, res) => {
  const { username, email, password, confirmpassword, mobilenumber } = req.body;

  if (password !== confirmpassword) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const insertQuery = `
      INSERT INTO users (name, email, password, confirmpassword, mobilenumber)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(insertQuery, [username, email, password, confirmpassword, mobilenumber], (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Registered successfully!' });
    });
  });
});

// ✅ Login route
app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });

    if (results.length === 0) {
      return res.status(401).json({ error: 'User not found' });
    }

    const user = results[0];

    if (user.password !== password) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const userId = user.id || user.ID || null;

    const loginQuery = `
      INSERT INTO login (user_id, email, login_time)
      VALUES (?, ?, NOW())
    `;

    db.query(loginQuery, [userId, email], (loginErr) => {
      if (loginErr) {
        console.error('Login logging failed:', loginErr.message);
        return res.status(500).json({ error: 'Login success, but logging failed.' });
      }

      res.status(200).json({
        message: 'Login successful',
        user: {
          id: user.id,
          username: user.name,
          email: user.email
        }
      });
    });
  });
});

// ✅ Dashboard - latest jobs
app.get('/dashboard-data', (req, res) => {
  db.query('SELECT * FROM jobs ORDER BY created_at DESC LIMIT 5', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch dashboard data' });
    res.json({ jobs: results });
  });
});

// ✅ Company logos
app.get('/company-logos', (req, res) => {
  db.query('SELECT * FROM company_logos', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch logos' });
    res.json(results);
  });
});

app.post('/company-logos', (req, res) => {
  const { name, logo } = req.body;
  if (!name || !logo) return res.status(400).json({ error: 'Missing fields' });

  db.query('INSERT INTO company_logos (name, logo) VALUES (?, ?)', [name, logo], (err) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.json({ message: 'Company added successfully' });
  });
});

// ✅ Job Posting
app.post('/job-posting', (req, res) => {
  const {
    jobTitle, jobId, description, salary, location, logo,
    skills, techStack, cgpa, branch, year, visibility, colleges
  } = req.body;

  const query = `
    INSERT INTO jobs 
    (jobTitle, jobId, description, salary, location, logo,
     skills, techStack, cgpa, branch, year, visibility, colleges)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(query, [
    jobTitle, jobId, description, salary, location, logo,
    skills, techStack, cgpa, branch, year, visibility, colleges
  ], (err) => {
    if (err) {
      console.error('❌ Database error:', err.sqlMessage || err.message);
      return res.status(500).json({ error: 'Database insert failed' });
    }

    res.json({ message: 'Job posted successfully' });
  });
});

// ✅ Get / Update / Delete Jobs
app.get('/posted-jobs', (req, res) => {
  db.query('SELECT * FROM jobs ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch posted jobs' });
    res.json(results);
  });
});

app.get('/job/:id', (req, res) => {
  db.query('SELECT * FROM jobs WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: 'Failed to fetch job' });
    if (results.length === 0) return res.status(404).json({ error: 'Job not found' });
    res.json(results[0]);
  });
});

app.put('/job/:id', (req, res) => {
  const {
    jobTitle, jobId: jobCode, description, salary, location, logo,
    skills, techStack, cgpa, branch, year, visibility, colleges
  } = req.body;

  db.query(
    `UPDATE jobs SET jobTitle=?, jobId=?, description=?, salary=?, location=?, logo=?,
     skills=?, techStack=?, cgpa=?, branch=?, year=?, visibility=?, colleges=? WHERE id=?`,
    [jobTitle, jobCode, description, salary, location, logo,
     skills, techStack, cgpa, branch, year, visibility, colleges, req.params.id],
    (err) => {
      if (err) return res.status(500).json({ error: 'Failed to update job' });
      res.json({ message: 'Job updated successfully' });
    }
  );
});

app.delete('/job/:id', (req, res) => {
  db.query('DELETE FROM jobs WHERE id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Failed to delete job' });
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Job not found' });
    res.json({ message: 'Job deleted successfully' });
  });
});

// ✅ 💬 Communication Tools - Routes

// Message Templates
app.post('/api/message-templates', (req, res) => {
  const { name, type, status, last_updated, content } = req.body;
  const sql = `INSERT INTO message_templates (name, type, status, last_updated, content) VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [name, type, status, last_updated, content], (err) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.status(200).json({ message: 'Message Template added successfully' });
  });
});

// Message Triggers
app.post('/api/message-triggers', (req, res) => {
  const { name, type, status, last_sent } = req.body;
  const sql = `INSERT INTO message_triggers (name, type, status, last_sent) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, type, status, last_sent], (err) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.status(200).json({ message: 'Message Trigger added successfully' });
  });
});

// Event Notifications
app.post('/api/event-notifications', (req, res) => {
  const { name, type, status, last_sent } = req.body;
  const sql = `INSERT INTO event_notifications (name, type, status, last_sent) VALUES (?, ?, ?, ?)`;
  db.query(sql, [name, type, status, last_sent], (err) => {
    if (err) return res.status(500).json({ error: 'Insert failed' });
    res.status(200).json({ message: 'Event Notification added successfully' });
  });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
