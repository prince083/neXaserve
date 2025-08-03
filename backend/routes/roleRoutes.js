const { protect, authorizeRoles } = require('../middleWares/authMiddleware');
const express = require('express');
const router = express.Router();
const {ServicesAndProviders}=require('../controllers/adminDataController');
const {ProviderServices}=require('../controllers/ProviderServiceController')

// Protect route for logged-in users only
router.get('/me', protect, (req, res) => {
  res.json(req.user); // logged-in user
});

// Admin-only route
router.get('/admin-dashboard', protect, authorizeRoles('admin'), ServicesAndProviders);  
//so by these admin wil see all users and services and providers and can approves , and only apporved one will be see to everyone as per earlier logic

// Provider-only route
router.get('/provider-services', protect, authorizeRoles('provider'), ProviderServices);
// here provider will get to see all its services posted

module.exports = router;