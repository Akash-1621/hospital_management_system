const mongoose = require('mongoose');
const User = require('./models/User');
const Doctor = require('./models/Doctor');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const PHOTO_PATH = 'C:/Users/akash/.gemini/antigravity/brain/0191d1cc-01e3-401c-afae-f496bfe49626/doctor_akash_portrait_1773682412253.png';

async function updateAkashProfile() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    // Read the image and convert to base64
    const imageData = fs.readFileSync(PHOTO_PATH);
    const base64Image = `data:image/png;base64,${imageData.toString('base64')}`;
    
    const email = 'Akash@gmail.com'; // Case sensitive check
    const details = {
        name: 'Akash Prasad M',
        phone: '+91 9988776655',
        photo: base64Image,
        specialization: 'Senior Medical Consultant'
    };

    // 1. Update User
    const user = await User.findOneAndUpdate(
        { email: { $regex: new RegExp(`^${email}$`, 'i') } },
        { 
            name: details.name,
            phone: details.phone,
            photo: details.photo,
            specialization: details.specialization
        },
        { new: true }
    );

    if (user) {
        console.log('User profile updated successfully.');
        
        // 2. Update Doctor record if exists
        await Doctor.findOneAndUpdate(
            { email: user.email },
            { 
                name: details.name,
                contact: details.phone,
                avatar: details.photo,
                specialization: details.specialization
            }
        );
        console.log('Doctor record synced.');
    } else {
        console.log('User not found.');
    }

    process.exit(0);
  } catch (err) {
    console.error('Update failed:', err);
    process.exit(1);
  }
}

updateAkashProfile();
