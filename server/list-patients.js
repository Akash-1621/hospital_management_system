const mongoose = require('mongoose');
const Patient = require('./models/Patient');
require('dotenv').config();

async function listPatients() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/caresphere");
    const patients = await Patient.find();
    console.log(JSON.stringify(patients, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

listPatients();
