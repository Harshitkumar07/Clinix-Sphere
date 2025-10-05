const express = require('express');
const { body } = require('express-validator');
const {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription
} = require('../controllers/prescription.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const createPrescriptionValidation = [
  body('appointmentId').notEmpty().withMessage('Appointment ID is required'),
  body('symptoms').trim().notEmpty().withMessage('Symptoms are required'),
  body('diagnosis').trim().notEmpty().withMessage('Diagnosis is required'),
  body('medicines').isArray({ min: 1 }).withMessage('At least one medicine is required'),
  body('medicines.*.name').trim().notEmpty().withMessage('Medicine name is required'),
  body('medicines.*.dosage').trim().notEmpty().withMessage('Medicine dosage is required'),
  body('medicines.*.duration').trim().notEmpty().withMessage('Medicine duration is required'),
  body('notes').optional().trim()
];

const updatePrescriptionValidation = [
  body('symptoms').optional().trim().notEmpty().withMessage('Symptoms cannot be empty'),
  body('diagnosis').optional().trim().notEmpty().withMessage('Diagnosis cannot be empty'),
  body('medicines').optional().isArray({ min: 1 }).withMessage('At least one medicine is required'),
  body('medicines.*.name').optional().trim().notEmpty().withMessage('Medicine name is required'),
  body('medicines.*.dosage').optional().trim().notEmpty().withMessage('Medicine dosage is required'),
  body('medicines.*.duration').optional().trim().notEmpty().withMessage('Medicine duration is required'),
  body('notes').optional().trim()
];

// Routes
router.post('/', authorize('doctor'), createPrescriptionValidation, validate, createPrescription);
router.get('/', getPrescriptions);
router.get('/:id', getPrescriptionById);
router.patch('/:id', authorize('doctor'), updatePrescriptionValidation, validate, updatePrescription);

module.exports = router;
