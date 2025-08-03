const express = require('express');
const { createService, getAllServices,deleteService } = require('../controllers/serviceController');
const { protect, authorizeRoles } = require('../middleWares/authMiddleware');

const router = express.Router();

router.post('/createService',protect, authorizeRoles('provider'), createService); //for creating services
router.delete('/deleteService/:id',protect,authorizeRoles('provider'),deleteService); //for deleteing services
router.get('/all',getAllServices); // anyone can view

module.exports = router;