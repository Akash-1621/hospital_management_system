const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
require('dotenv').config();

async function verify() {
  await mongoose.connect(process.env.MONGO_URI);
  const user = await User.findOne({ email: /akash@gmail.com/i });
  console.log('User Photo Length:', user?.photo?.length || 0);
  console.log('User Name:', user?.name);
  console.log('User Phone:', user?.phone);
  
  const doctor = await Doctor.findOne({ email: user.email });
  console.log('Doctor Avatar Length:', doctor?.avatar?.length || 0);
  
  process.exit(0);
}
verify();
