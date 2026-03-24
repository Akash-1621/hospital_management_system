const mongoose = require('mongoose');
async function test() {
  try {
    await mongoose.connect('mongodb://localhost:27017/caresphere');
    console.log('Successfully connected to local MongoDB');
    process.exit(0);
  } catch (err) {
    console.error('Failed to connect to local MongoDB:', err.message);
    process.exit(1);
  }
}
test();
