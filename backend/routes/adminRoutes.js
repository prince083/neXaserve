const express = require('express');
const { protect, authorizeRoles } = require('../middleWares/authMiddleware');
const { approveService, approveProvider } = require('../controllers/adminController');

const router = express.Router();

router.put('/approve/service/:id', protect, authorizeRoles('admin'), approveService);
router.put('/approve/provider/:id', protect, authorizeRoles('admin'), approveProvider);

module.exports = router;
