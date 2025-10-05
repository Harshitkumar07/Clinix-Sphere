require('dotenv').config();
const mongoose = require('mongoose');
const Appointment = require('../models/Appointment.model');
const User = require('../models/User.model');
const connectDB = require('../config/database');

const seedAppointments = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing appointments...');
    await Appointment.deleteMany({});

    // Get doctor and patient
    const doctor = await User.findOne({ email: 'sarah.johnson@clinix.com' });
    const patient = await User.findOne({ email: 'john.doe@example.com' });

    if (!doctor || !patient) {
      console.error('❌ Doctor or patient not found. Run npm run seed first.');
      process.exit(1);
    }

    const appointments = [
      {
        patient: patient._id,
        doctor: doctor._id,
        date: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
        time: '10:00 AM',
        reason: 'Regular checkup',
        status: 'confirmed',
        notes: 'Patient requested early morning slot'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Day after tomorrow
        time: '2:00 PM',
        reason: 'Follow-up consultation',
        status: 'pending',
        notes: 'Check previous test results'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        time: '11:30 AM',
        reason: 'Annual physical examination',
        status: 'completed',
        notes: 'All vitals normal'
      },
      {
        patient: patient._id,
        doctor: doctor._id,
        date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Next week
        time: '3:30 PM',
        reason: 'Lab results discussion',
        status: 'pending',
        notes: ''
      }
    ];

    console.log('📅  Creating appointments...');
    await Appointment.insertMany(appointments);

    console.log('✅ Appointments seeded successfully!');
    console.log(`   - ${appointments.length} appointments created`);
    console.log(`   - Doctor: ${doctor.name}`);
    console.log(`   - Patient: ${patient.name}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedAppointments();
