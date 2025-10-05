require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User.model');
const connectDB = require('../config/database');

const doctors = [
  {
    name: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@clinix.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Cardiology',
    phone: '+1234567890',
    experience: 12,
    avatar: 'https://i.pravatar.cc/150?img=1'
  },
  {
    name: 'Dr. Michael Chen',
    email: 'michael.chen@clinix.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Neurology',
    phone: '+1234567891',
    experience: 15,
    avatar: 'https://i.pravatar.cc/150?img=12'
  },
  {
    name: 'Dr. Emily Davis',
    email: 'emily.davis@clinix.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Pediatrics',
    phone: '+1234567892',
    experience: 8,
    avatar: 'https://i.pravatar.cc/150?img=5'
  },
  {
    name: 'Dr. James Wilson',
    email: 'james.wilson@clinix.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Orthopedics',
    phone: '+1234567893',
    experience: 10,
    avatar: 'https://i.pravatar.cc/150?img=13'
  },
  {
    name: 'Dr. Lisa Anderson',
    email: 'lisa.anderson@clinix.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'Dermatology',
    phone: '+1234567894',
    experience: 7,
    avatar: 'https://i.pravatar.cc/150?img=9'
  },
  {
    name: 'Dr. Robert Martinez',
    email: 'robert.martinez@clinix.com',
    password: 'doctor123',
    role: 'doctor',
    specialty: 'General Medicine',
    phone: '+1234567895',
    experience: 20,
    avatar: 'https://i.pravatar.cc/150?img=14'
  }
];

const patients = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'patient123',
    role: 'patient',
    phone: '+1234567896',
    avatar: 'https://i.pravatar.cc/150?img=33'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    password: 'patient123',
    role: 'patient',
    phone: '+1234567897',
    avatar: 'https://i.pravatar.cc/150?img=44'
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});

    console.log('👨‍⚕️  Seeding doctors...');
    // Use create() or save() instead of insertMany() to trigger password hashing
    for (const doctor of doctors) {
      await User.create(doctor);
    }

    console.log('👤  Seeding patients...');
    for (const patient of patients) {
      await User.create(patient);
    }

    console.log('✅ Database seeded successfully!');
    console.log(`   - ${doctors.length} doctors created`);
    console.log(`   - ${patients.length} patients created`);
    console.log('\n📝 Test Credentials:');
    console.log('   Doctor: sarah.johnson@clinix.com / doctor123');
    console.log('   Patient: john.doe@example.com / patient123');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();
