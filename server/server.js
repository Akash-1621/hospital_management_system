const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const patientRoutes = require('./routes/patientRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
const Doctor = require('./models/Doctor');
const User = require('./models/User');
const Patient = require('./models/Patient');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const authRoutes = require('./routes/authRoutes');

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/chatbot', chatbotRoutes);

// Doctor listing endpoint
app.get('/api/doctors', async (req, res) => {
  try {
    const filter = {};
    if (req.query.availableOnly === 'true') {
        filter.isAvailable = true;
    }
    const doctors = await Doctor.find(filter);
    res.json({ success: true, data: doctors });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update doctor availability
app.put('/api/doctors/:id/availability', async (req, res) => {
  try {
    const { isAvailable, unavailabilityReason } = req.body;
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { 
        isAvailable, 
        unavailabilityReason: isAvailable ? '' : unavailabilityReason 
      },
      { new: true }
    );
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }
    res.json({ success: true, data: doctor });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update profile endpoint
app.put('/api/auth/profile/:email', async (req, res) => {
  try {
    const { name, phone, photo, specialization } = req.body;
    const email = req.params.email;

    console.log(`Updating profile for: ${email}`);

    // 1. Update User Model
    // Simple case-insensitive match for email
    const user = await User.findOneAndUpdate(
      { email: { $regex: new RegExp(`^${email}$`, 'i') } },
      { name, phone, photo, specialization },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // 2. Cross-update role specific collections
    if (user.role === 'Doctor') {
      await Doctor.findOneAndUpdate(
        { email },
        { name, contact: phone, avatar: photo, specialization },
        { new: true }
      );
    } else if (user.role === 'Patient') {
      await Patient.findOneAndUpdate(
        { email },
        { name, contact: phone },
        { new: true }
      );
    }

    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'CareSphere Hospital Management API',
    endpoints: {
      patients: '/api/patients',
      appointments: '/api/appointments',
      doctors: '/api/doctors',
      chatbot: '/api/chatbot',
    },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
