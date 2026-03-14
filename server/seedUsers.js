const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const users = [
  {
    name: 'Dr. Priya Menon',
    email: 'doctor@care.com',
    password: 'password123',
    role: 'Doctor',
  },
  {
    name: 'Rahul Sharma',
    email: 'patient@care.com',
    password: 'password123',
    role: 'Patient',
  },
  {
    name: 'Anita Desai',
    email: 'receptionist@care.com',
    password: 'password123',
    role: 'Receptionist',
  },
];

const seedUsers = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/caresphere");

    // Delete existing users
    await User.deleteMany();
    console.log('Users deleted...');

    // Hash passwords and add users
    for (let u of users) {
        await User.create(u);
    }
    
    console.log('Users imported...');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedUsers();
