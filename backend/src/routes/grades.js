const express = require('express');
const router = express.Router();
const { auth, checkRole } = require('../middleware/auth');

// Placeholder for grades routes
router.get('/', auth, (req, res) => {
  res.json({ message: 'Grades route - to be implemented' });
});

module.exports = router; 