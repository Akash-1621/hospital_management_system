const Patient = require('../models/Patient');

// @desc    Create a new patient
// @route   POST /api/patients
const createPatient = async (req, res) => {
  try {
    const { email } = req.body;
    let patient;
    
    if (email) {
      // If email provided, find and update or create (upsert)
      patient = await Patient.findOneAndUpdate(
        { email: email.toLowerCase() },
        { $set: req.body },
        { new: true, upsert: true, runValidators: true }
      );
    } else {
      // Just create new if no email
      patient = await Patient.create(req.body);
    }

    res.status(201).json({
      success: true,
      message: email ? 'Patient record updated successfully' : 'Patient created successfully',
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get all patients (with filters & pagination)
// @route   GET /api/patients
const getPatients = async (req, res) => {
  try {
    const {
      department,
      status,
      startDate,
      endDate,
      search,
      page = 1,
      limit = 50,
    } = req.query;

    const filter = {};

    if (department) filter.department = department;
    if (status) filter.status = status;

    if (startDate || endDate) {
      filter.admissionDate = {};
      if (startDate) filter.admissionDate.$gte = new Date(startDate);
      if (endDate) filter.admissionDate.$lte = new Date(endDate);
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Patient.countDocuments(filter);
    const patients = await Patient.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: patients.length,
      total,
      page: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      data: patients,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get a single patient by ID
// @route   GET /api/patients/:id
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }
    res.status(200).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update a patient (partial update supported)
// @route   PUT /api/patients/:id
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!patient) {
      return res.status(404).json({
        success: false,
        message: 'Patient not found',
      });
    }
    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      data: patient,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Delete a patient by ID or Name
// @route   DELETE /api/patients/:id
const deletePatient = async (req, res) => {
  try {
    const identifier = req.params.id;
    let patient;

    // Check if the identifier is a valid MongoDB ObjectId
    const isObjectId = /^[0-9a-fA-F]{24}$/.test(identifier);

    if (isObjectId) {
      patient = await Patient.findByIdAndDelete(identifier);
    } else {
      // Search by name (case-insensitive)
      patient = await Patient.findOneAndDelete({ name: { $regex: new RegExp(`^${identifier}$`, 'i') } });
    }

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: `Patient not found with ${isObjectId ? 'ID' : 'name'}: ${identifier}`,
      });
    }
    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully',
      data: patient,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient,
};
