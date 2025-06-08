const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Example API endpoint
app.post('/api/applications', (req, res) => {
  const data = req.body;
  console.log('Received application:', data);
  fs.appendFileSync('applications.jsonl', JSON.stringify(data) + '\n');
  res.status(200).json({ message: 'Application saved' });
});

// Serve React static files
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback to React for any other route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});



app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
