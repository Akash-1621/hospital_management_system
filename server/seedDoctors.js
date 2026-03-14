const mongoose = require('mongoose');
require('dotenv').config();
const Doctor = require('./models/Doctor');

const doctors = [
  {
    name: 'Dr. Priya Menon',
    department: 'Cardiology',
    specialization: 'Interventional Cardiology',
    experience: '12 years',
    contact: '+91 98765 43210',
    email: 'priya.menon@caresphere.com',
    avatar: 'PM',
    color: 'from-rose-500 to-pink-600',
    consultationFee: 1200,
    availableSlots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM'],
    maxAppointmentsPerSlot: 3,
  },
  {
    name: 'Dr. Anil Kumar',
    department: 'Neurology',
    specialization: 'Neurosurgery',
    experience: '15 years',
    contact: '+91 98765 43211',
    email: 'anil.kumar@caresphere.com',
    avatar: 'AK',
    color: 'from-indigo-500 to-purple-600',
    consultationFee: 1500,
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM', '02:00 PM', '03:00 PM', '03:30 PM', '04:00 PM'],
    maxAppointmentsPerSlot: 2,
  },
  {
    name: 'Dr. Sneha Reddy',
    department: 'Pediatrics',
    specialization: 'Neonatology',
    experience: '8 years',
    contact: '+91 98765 43212',
    email: 'sneha.reddy@caresphere.com',
    avatar: 'SR',
    color: 'from-emerald-500 to-teal-600',
    consultationFee: 800,
    availableSlots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM'],
    maxAppointmentsPerSlot: 4,
  },
  {
    name: 'Dr. Rajesh Iyer',
    department: 'Orthopedics',
    specialization: 'Joint Replacement',
    experience: '20 years',
    contact: '+91 98765 43213',
    email: 'rajesh.iyer@caresphere.com',
    avatar: 'RI',
    color: 'from-amber-500 to-orange-600',
    consultationFee: 1000,
    availableSlots: ['09:00 AM', '10:00 AM', '11:00 AM', '02:00 PM', '03:00 PM', '04:00 PM'],
    maxAppointmentsPerSlot: 3,
  },
  {
    name: 'Dr. Fatima Sheikh',
    department: 'General Medicine',
    specialization: 'Internal Medicine',
    experience: '10 years',
    contact: '+91 98765 43214',
    email: 'fatima.sheikh@caresphere.com',
    avatar: 'FS',
    color: 'from-cyan-500 to-blue-600',
    consultationFee: 500,
    availableSlots: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'],
    maxAppointmentsPerSlot: 5,
  },
  {
    name: 'Dr. Vikram Patel',
    department: 'Cardiology',
    specialization: 'Cardiac Electrophysiology',
    experience: '14 years',
    contact: '+91 98765 43215',
    email: 'vikram.patel@caresphere.com',
    avatar: 'VP',
    color: 'from-violet-500 to-purple-600',
    consultationFee: 1300,
    availableSlots: ['09:00 AM', '09:30 AM', '10:00 AM', '11:00 AM', '02:00 PM', '02:30 PM', '03:00 PM'],
    maxAppointmentsPerSlot: 3,
  },
];

const seedDoctors = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/caresphere');
    console.log('Connected to MongoDB');

    await Doctor.deleteMany({});
    console.log('Cleared existing doctors');

    const created = await Doctor.insertMany(doctors);
    console.log(`✅ ${created.length} doctors seeded successfully!`);

    created.forEach((d) => {
      console.log(`  • ${d.name} (${d.department}) — ₹${d.consultationFee}`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedDoctors();
