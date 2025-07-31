const express = require('express');
const { createService, getAllServices } = require('../controllers/serviceController');
const { protect, authorizeRoles } = require('../middleWares/authMiddleware');

const router = express.Router();

router.route('/')
  .post(protect, authorizeRoles('provider'), createService)
  .get(getAllServices); // anyone can view

module.exports = router;