const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkUsers() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/caresphere");
    const users = await User.find({}, { password: 0 }); // Don't fetch passwords
    console.log('Current Users in Database:');
    console.log(JSON.stringify(users, null, 2));
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkUsers();
