const express = require('express');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Routes
app.get('/ping', (req, res) => {
  res.status(200).json({ message: 'pong' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
}); 