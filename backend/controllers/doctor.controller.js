const User = require('../models/User.model');

/**
 * @route   GET /api/doctors
 * @desc    Get all doctors
 * @access  Private
 */
const getAllDoctors = async (req, res) => {
  try {
    const { specialty, search } = req.query;
    
    let query = { role: 'doctor' };

    // Filter by specialty if provided
    if (specialty) {
      query.specialty = { $regex: specialty, $options: 'i' };
    }

    // Search by name if provided
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    const doctors = await User.find(query)
      .select('-password')
      .sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: doctors.length,
      data: {
        doctors
      }
    });
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctors',
      error: error.message
    });
  }
};

/**
 * @route   GET /api/doctors/:id
 * @desc    Get single doctor by ID
 * @access  Private
 */
const getDoctorById = async (req, res) => {
  try {
    const doctor = await User.findOne({
      _id: req.params.id,
      role: 'doctor'
    }).select('-password');

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: 'Doctor not found'
      });
    }

    res.status(200).json({
      success: true,
      data: {
        doctor
      }
    });
  } catch (error) {
    console.error('Get doctor error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching doctor',
      error: error.message
    });
  }
};

module.exports = {
  getAllDoctors,
  getDoctorById
};
