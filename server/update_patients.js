require('dotenv').config();
const mongoose = require('mongoose');

const updatePatients = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const Patient = require('./models/Patient');
    
    await Patient.findOneAndUpdate({ email: 'chen@gmail.com' }, { $set: { status: 'ADMITTED', condition: 'Pneumonia (Severe)', admittedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) } });
    await Patient.findOneAndUpdate({ email: 'miller@gmail.com' }, { $set: { status: 'ADMITTED', condition: 'Appendectomy', admittedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) } });
    await Patient.findOneAndUpdate({ email: 'wilson@gmail.com' }, { $set: { status: 'ADMITTED', condition: 'Cardiac Observation', admittedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) } });
    await Patient.findOneAndUpdate({ email: 'garcia@gmail.com' }, { $set: { status: 'ADMITTED', condition: 'Knee Replacement', admittedDate: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000) } });
    
    console.log('Successfully updated the 4 newly registered patients to ADMITTED status with their conditions!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
updatePatients();
