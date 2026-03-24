const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Patient name is required'],
      trim: true,
    },
    age: {
      type: Number,
      required: [true, 'Age is required'],
      min: 0,
      max: 150,
    },
    dob: {
      type: Date,
      required: [true, 'DOB is required'],
    },
    representative: {
      name: String,
      relation: {
        type: String,
        enum: ['PARENT', 'GUARDIAN', 'NONE'],
        default: 'NONE'
      }
    },
    gender: {
      type: String,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      default: 'OTHER',
    },
    contact: {
      type: String,
      default: 'Not Specified',
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      trim: true,
    },
    department: {
      type: String,
      enum: ['Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'General Medicine', 'ICU', 'Maternity', 'ENT'],
      default: 'General Medicine',
    },
    medicalHistory: {
      type: String,
      trim: true,
    },
    admissionDate: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['ADMITTED', 'DISCHARGED', 'UNDER_TREATMENT', 'CRITICAL'],
      default: 'UNDER_TREATMENT',
    },
    assignedDoctor: {
      type: String,
      trim: true,
    },
    photo: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Patient', patientSchema);
