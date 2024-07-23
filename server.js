const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const db = require('./database');

const app = express();
const PORT = process.env.PORT || 7000;

app.use(cors());
app.use(bodyParser.json());

app.post('/addData', (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  db.get(`SELECT email FROM students WHERE email = ?`, [email], (err, row) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    if (row) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const stmt = db.prepare(`INSERT INTO students (username, email, password) VALUES (?, ?, ?)`);
    stmt.run([username, email, password], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({ message: 'User registered successfully', userId: this.lastID });
    });
    stmt.finalize();
  });
});

app.get('/users', (req, res) => {
  db.all(`SELECT id, username, email FROM students`, [], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.status(200).json(rows);
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
