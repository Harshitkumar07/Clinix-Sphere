const Appointment = require('../models/Appointment.model');
const User = require('../models/User.model');

/**
 * @route   POST /api/appointments
 * @desc    Create a new appointment
 * @access  Private (Patient)
 */
const createAppointment = async (req, res) => {
  try {
    const { doctorId, date, time, reason } = req.body;

    // Verify doctor exists
    const doctor = await User.findOne({ _id: doctorId, role: 'doctor' });
    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    // Create appointment
    const appointment = new Appointment({
      patient: req.user._id,
      doctor: doctorId,
      date,
      time,
      reason,
      status: 'pending'
    });

    await appointment.save();

    // Populate patient and doctor details
    await appointment.populate('patient', '-password');
    await appointment.populate('doctor', '-password');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      data: {
        appointment
      }
    });
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

/**
 * @route   POST /api/appointments/create-for-patient
 * @desc    Doctor creates appointment for a patient
 * @access  Private (Doctor)
 */
const createAppointmentForPatient = async (req, res) => {
  try {
    const { patient, date, time, reason } = req.body;

    // Find or create patient
    let patientUser;
    
    if (patient.email) {
      // Check if patient exists
      patientUser = await User.findOne({ email: patient.email });
      
      if (!patientUser) {
        // Create new patient user
        patientUser = new User({
          name: patient.name,
          email: patient.email,
          phone: patient.phone,
          role: 'patient',
          password: 'tempPassword123' // Temporary password, patient should reset
        });
        await patientUser.save();
      }
    }

    // Create appointment
    const appointment = new Appointment({
      patient: patientUser._id,
      doctor: req.user._id, // Current logged-in doctor
      date,
      time,
      reason,
      status: 'confirmed' // Doctor-created appointments are auto-confirmed
    });

    await appointment.save();

    // Populate patient and doctor details
    await appointment.populate('patient', '-password');
    await appointment.populate('doctor', '-password');

    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      data: {
        appointment
      }
    });
  } catch (error) {
    console.error('Create appointment for patient error:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating appointment',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/appointments
 * @desc    Get appointments (role-based)
 * @access  Private
 */
const getAppointments = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};

    // Filter based on user role
    if (req.user.role === 'patient') {
      query.patient = req.user._id;
    } else if (req.user.role === 'doctor') {
      query.doctor = req.user._id;
    }

    // Filter by status if provided
    if (status) {
      query.status = status;
    }

    const appointments = await Appointment.find(query)
      .populate('patient', '-password')
      .populate('doctor', '-password')
      .sort({ date: -1, time: -1 });

    res.status(200).json({
      success: true,
      count: appointments.length,
      data: {
        appointments
      }
    });
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointments',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/appointments/:id
 * @desc    Get single appointment by ID
 * @access  Private
 */
const getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', '-password')
      .populate('doctor', '-password');

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check if user is authorized to view this appointment
    const isAuthorized = 
      appointment.patient._id.toString() === req.user._id.toString() ||
      appointment.doctor._id.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this appointment'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        appointment
      }
    });
  } catch (error) {
    console.error('Get appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching appointment',
      error: error.message
    });
  }
};

/**
 * @route   PATCH /api/appointments/:id/status
 * @desc    Update appointment status
 * @access  Private (Doctor)
 */
const updateAppointmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const appointment = await Appointment.findById(req.params.id);

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
        message: 'Not authorized to update this appointment'
      });
    }

    // Update status
    appointment.status = status;
    await appointment.save();

    // Populate details
    await appointment.populate('patient', '-password');
    await appointment.populate('doctor', '-password');

    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      data: {
        appointment
      }
    });
  } catch (error) {
    console.error('Update appointment status error:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating appointment status',
      error: error.message
    });
  }
};

/**
 * @route   DELETE /api/appointments/:id
 * @desc    Cancel/Delete appointment
 * @access  Private
 */
const deleteAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: 'Appointment not found'
      });
    }

    // Check authorization
    const isAuthorized = 
      appointment.patient.toString() === req.user._id.toString() ||
      appointment.doctor.toString() === req.user._id.toString();

    if (!isAuthorized) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this appointment'
      });
    }

    await appointment.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully'
    });
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting appointment',
      error: error.message
    });
  }
};

module.exports = {
  createAppointment,
  createAppointmentForPatient,
  getAppointments,
  getAppointmentById,
  updateAppointmentStatus,
  deleteAppointment
};
