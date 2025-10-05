const express = require('express');
const { getAllDoctors, getDoctorById } = require('../controllers/doctor.controller');
const { authenticate } = require('../middleware/auth.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Routes
router.get('/', getAllDoctors);
router.get('/:id', getDoctorById);

module.exports = router;
