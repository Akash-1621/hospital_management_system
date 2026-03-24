const mongoose = require('mongoose');
const Patient = require('./models/Patient');
const Appointment = require('./models/Appointment');
require('dotenv').config();

async function checkData() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/caresphere");
    
    const patients = await Patient.countDocuments();
    const appointments = await Appointment.countDocuments();
    
    console.log('--- Local Database Stats ---');
    console.log('Patients count:', patients);
    console.log('Appointments count:', appointments);
    
    if (patients > 0) {
        const lastPatient = await Patient.findOne().sort({ createdAt: -1 });
        console.log('Last added patient:', lastPatient.name);
    }
    
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkData();
