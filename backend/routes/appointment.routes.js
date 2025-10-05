const express = require('express');
const { body } = require('express-validator');
const {
  createAppointment,
  createAppointmentForPatient,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment
} = require('../controllers/appointment.controller');
const { authenticate, authorize } = require('../middleware/auth.middleware');
const validate = require('../middleware/validator.middleware');

const router = express.Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const createAppointmentValidation = [
  body('doctorId').notEmpty().withMessage('Doctor ID is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
];

const createForPatientValidation = [
  body('patient.name').trim().notEmpty().withMessage('Patient name is required'),
  body('patient.email').isEmail().withMessage('Valid email is required'),
  body('date').isISO8601().withMessage('Valid date is required'),
  body('time').notEmpty().withMessage('Time is required'),
  body('reason').trim().notEmpty().withMessage('Reason is required')
];

const updateStatusValidation = [
  body('status')
    .isIn(['pending', 'confirmed', 'completed', 'cancelled'])
    .withMessage('Invalid status')
];

// Routes
router.post('/', authorize('patient'), createAppointmentValidation, validate, createAppointment);
router.post('/create-for-patient', authorize('doctor'), createForPatientValidation, validate, createAppointmentForPatient);
router.get('/', getAppointments);
router.get('/:id', getAppointmentById);
router.patch('/:id/status', authorize('doctor'), updateStatusValidation, validate, updateAppointmentStatus);
router.delete('/:id', deleteAppointment);

module.exports = router;
