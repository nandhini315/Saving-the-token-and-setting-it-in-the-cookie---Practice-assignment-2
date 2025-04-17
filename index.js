const express = require('express');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;
const SECRET_KEY = 'mysecretkey'; // Use dotenv in real apps

app.use(cors());
app.use(express.static(__dirname)); // Serve static files (HTML, JS, CSS)

// Serve index.html at root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// JWT generator
app.get('/generate-token', (req, res) => {
  const payload = {
    username: 'test_user',
    role: 'student'
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '60s' });
  res.json({ token });
});

// JWT verifier
app.get('/verify-token', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];

  if (!token) return res.json({ message: 'Token not provided' });

  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.json({ message: 'Token expired or invalid' });
    res.json({ message: 'Token is valid', data: decoded });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
