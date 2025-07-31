const { protect, authorizeRoles } = require('../middleWares/authMiddleware');
const express = require('express');
const router = express.Router();

// Protect route for logged-in users only
router.get('/me', protect, (req, res) => {
  res.json(req.user); // logged-in user
});

// Admin-only route
router.get('/admin-dashboard', protect, authorizeRoles('admin'), (req, res) => {
  res.send('Admin dashboard');
});

// Provider-only route
router.get('/provider-services', protect, authorizeRoles('provider'), (req, res) => {
  res.send('Provider dashboard');
});

module.exports = router;