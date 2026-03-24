const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'fallback_secret_key', {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, dob, age, representative, phone, photo } = req.body;

    // Check if user exists
    // Check if user exists (case-insensitive)
    const userExists = await User.findOne({ 
      email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } 
    });

    if (userExists) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: role || 'Patient',
      phone: phone || '',
      photo: photo || ''
    });

    if (user) {
      // Create corresponding records in Doctor or Patient collections
      if (user.role === 'Doctor') {
        const Doctor = require('../models/Doctor');
        await Doctor.create({
          name: user.name,
          email: user.email,
          department: req.body.department || 'General Medicine',
          specialization: req.body.specialization || 'General Physician',
          experience: req.body.experience || '5 Years',
          contact: req.body.phone || req.body.contact || 'Not Specified',
          avatar: req.body.photo || '',
        });
      } else if (user.role === 'Patient') {
        const Patient = require('../models/Patient');
        await Patient.create({
          name: user.name,
          email: user.email,
          age: age || 30,
          dob: dob || new Date(),
          representative: representative || { name: '', relation: 'NONE' },
          gender: req.body.gender || 'OTHER',
          contact: req.body.phone || req.body.contact || 'Not Specified',
          department: req.body.department || 'General Medicine',
          status: req.body.status || 'UNDER_TREATMENT',
          photo: req.body.photo || ''
        });
      }

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          phone: user.phone,
          photo: user.photo,
          token: generateToken(user._id),
        },
      });
    } else {
      res.status(400).json({ success: false, message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Auth user & get token (Login)
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check for user email
    // Use case-insensitive regex to match existing users regardless of case
    const user = await User.findOne({ 
      email: { $regex: new RegExp(`^${email.trim()}$`, 'i') } 
    }).select('+password');

    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        photo: user.photo,
        specialization: user.specialization,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
};
