const express = require('express');
const { body } = require('express-validator');
const {
  getProfile,
  updateProfile,
  uploadProfilePhoto,
  deleteProfilePhoto
} = require('../controllers/user.controller');
const { authenticate } = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware');
const upload = require('../config/upload');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const updateProfileValidation = [
  body('name').optional().trim().notEmpty().withMessage('Name cannot be empty'),
  body('phone').optional().trim(),
  body('specialty').optional().trim(),
  body('experience').optional().isNumeric().withMessage('Experience must be a number'),
  body('bio').optional().trim(),
  body('location').optional().trim(),
  body('education').optional().trim(),
  body('licenseNumber').optional().trim()
];

// Routes
router.get('/profile', getProfile);
router.patch('/profile', updateProfileValidation, validate, updateProfile);
router.post('/profile/photo', upload.single('photo'), uploadProfilePhoto);
router.delete('/profile/photo', deleteProfilePhoto);

module.exports = router;
