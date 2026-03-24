const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
const User = require('./models/User');
require('dotenv').config();

async function checkCloudData() {
  try {
    console.log('Connecting to Atlas...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!');
    
    const patientCount = await Patient.countDocuments();
    const appointmentCount = await Appointment.countDocuments();
    const userCount = await User.countDocuments();
    
    console.log('--- Cloud Database Stats ---');
    console.log('Patients:', patientCount);
    console.log('Appointments:', appointmentCount);
    console.log('Users:', userCount);
    
    if (patientCount > 0) {
        const patients = await Patient.find().limit(5);
        console.log('Recent Patients:', patients.map(p => p.name).join(', '));
    }

    if (userCount > 0) {
        const users = await User.find().limit(5);
        console.log('Cloud Users:', users.map(u => u.email).join(', '));
    }
    
    process.exit(0);
  } catch (err) {
    console.error('Connection failed:', err.message);
    process.exit(1);
  }
}

checkCloudData();
