const express = require('express');
const { createBooking, getBookingsByUser } = require('../controllers/bookingController');
const { protect, authorizeRoles } = require('../middleWares/authMiddleware');

const router = express.Router();

router.post('/', protect, authorizeRoles('user'), createBooking);
router.get('/:userId', protect, authorizeRoles('user', 'admin'), getBookingsByUser);

module.exports = router;