const Prescription = require('../models/Prescription.model');
const Appointment = require('../models/Appointment.model');

/**
 * @route   POST /api/prescriptions
 * @desc    Create a new prescription
 * @access  Private (Doctor)
 */
const createPrescription = async (req, res) => {
  try {
    const { appointmentId, symptoms, diagnosis, medicines, notes } = req.body;

    // Verify appointment exists
    const appointment = await Appointment.findById(appointmentId);
    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if doctor is authorized
    if (appointment.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to create prescription for this appointment'
      });
    }

    // Check if appointment is completed
    if (appointment.status !== 'completed') {
      return res.status(400).json({
        success: false,
        message: 'Can only create prescription for completed appointments'
      });
    }

    // Check if prescription already exists
    const existingPrescription = await Prescription.findOne({ appointment: appointmentId });
    if (existingPrescription) {
      return res.status(400).json({
        success: false,
        message: 'Prescription already exists for this appointment'
      });
    }

    // Create prescription
    const prescription = new Prescription({
      appointment: appointmentId,
      doctor: req.user._id,
      patient: appointment.patient,
      symptoms,
      diagnosis,
      medicines,
      notes
    });

    await prescription.save();

    // Populate details
    await prescription.populate('doctor', '-password');
    await prescription.populate('patient', '-password');
    await prescription.populate('appointment');

    res.status(201).json({
      success: true,
      message: 'Prescription created successfully',
      data: {
        prescription
      }
    });
  } catch (error) {
    console.error('Create prescription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating prescription',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/prescriptions
 * @desc    Get prescriptions (filtered by patient or doctor)
 * @access  Private
 */
const getPrescriptions = async (req, res) => {
  try {
    const { patientId } = req.query;
    let query = {};

    // If user is a patient, show only their prescriptions
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } 
    // If user is a doctor, show prescriptions they created
    else if (req.user.role === 'doctor') {
      // If patientId is provided, filter by that patient
      if (patientId) {
        query.patient = patientId;
      }
      query.doctor = req.user._id;
    }

    const prescriptions = await Prescription.find(query)
      .populate('doctor', '-password')
      .populate('patient', '-password')
      .populate('appointment')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: prescriptions.length,
      data: {
        prescriptions
      }
    });
  } catch (error) {
    console.error('Get prescriptions error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching prescriptions',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/prescriptions/:id
 * @desc    Get single prescription by ID
 * @access  Private
 */
const getPrescriptionById = async (req, res) => {
  try {
    const prescription = await Prescription.findById(req.params.id)
      .populate('doctor', '-password')
      .populate('patient', '-password')
      .populate('appointment');

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    // Check authorization
    const isAuthorized = 
      prescription.patient._id.toString() === req.user._id.toString() ||
      prescription.doctor._id.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this prescription'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        prescription
      }
    });
  } catch (error) {
    console.error('Get prescription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching prescription',
      error: error.message
    });
  }
};

/**
 * @route   PATCH /api/prescriptions/:id
 * @desc    Update prescription
 * @access  Private (Doctor)
 */
const updatePrescription = async (req, res) => {
  try {
    const { symptoms, diagnosis, medicines, notes } = req.body;

    const prescription = await Prescription.findById(req.params.id);

    if (!prescription) {
      return res.status(404).json({
        success: false,
        message: 'Prescription not found'
      });
    }

    // Check if doctor is authorized
    if (prescription.doctor.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this prescription'
      });
    }

    // Update fields
    if (symptoms) prescription.symptoms = symptoms;
    if (diagnosis) prescription.diagnosis = diagnosis;
    if (medicines) prescription.medicines = medicines;
    if (notes !== undefined) prescription.notes = notes;

    await prescription.save();

    // Populate details
    await prescription.populate('doctor', '-password');
    await prescription.populate('patient', '-password');
    await prescription.populate('appointment');

    res.status(200).json({
      success: true,
      message: 'Prescription updated successfully',
      data: {
        prescription
      }
    });
  } catch (error) {
    console.error('Update prescription error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating prescription',
      error: error.message
    });
  }
};

module.exports = {
  createPrescription,
  getPrescriptions,
  getPrescriptionById,
  updatePrescription
};
