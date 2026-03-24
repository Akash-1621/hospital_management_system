const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

async function checkSpecificUser() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/caresphere");
    const user = await User.findOne({ email: 'akash@gmail.com' });
    if (user) {
      console.log('✅ User akash@gmail.com found in Database!');
      console.log('Role:', user.role);
    } else {
      console.log('❌ User not found.');
      const all = await User.find({}, {email: 1});
      console.log('Available emails:', all.map(u => u.email));
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

checkSpecificUser();
