const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Doctor name is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'ICU', 'Maternity', 'ENT'],
    },
    specialization: {
      type: String,
      default: 'General Physician',
      trim: true,
    },
    experience: {
      type: String,
      default: '5+ Years',
    },
    contact: {
      type: String,
      default: 'Not Specified',
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    avatar: {
      type: String,
      default: 'https://cdn-icons-png.flaticon.com/512/387/387561.png', // Default doctor icon
    },
    color: {
      type: String,
      default: 'from-cyan-500 to-blue-600',
    },
    consultationFee: {
      type: Number,
      default: 800,
    },
    availableSlots: {
      type: [String],
      default: ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM'],
    },
    maxAppointmentsPerSlot: {
      type: Number,
      default: 3,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    unavailabilityReason: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Doctor', doctorSchema);
