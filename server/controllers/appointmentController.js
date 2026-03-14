const Appointment = require('../models/Appointment');
const Doctor = require('../models/Doctor');

// @desc    Book a new appointment
// @route   POST /api/appointments
const bookAppointment = async (req, res) => {
  try {
    const { doctorId, appointmentDate, timeSlot } = req.body;

    // Check if doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    // Check if slot is valid
    if (!doctor.availableSlots.includes(timeSlot)) {
      return res.status(400).json({ success: false, message: 'Invalid time slot' });
    }

    // Check how many appointments exist for this doctor at this date+slot
    const dateStart = new Date(appointmentDate);
    dateStart.setHours(0, 0, 0, 0);
    const dateEnd = new Date(appointmentDate);
    dateEnd.setHours(23, 59, 59, 999);

    const existingCount = await Appointment.countDocuments({
      doctorId,
      timeSlot,
      appointmentDate: { $gte: dateStart, $lte: dateEnd },
      status: { $ne: 'CANCELLED' },
    });

    if (existingCount >= doctor.maxAppointmentsPerSlot) {
      return res.status(400).json({
        success: false,
        message: `This slot is fully booked. Max ${doctor.maxAppointmentsPerSlot} appointments per slot.`,
      });
    }

    const appointment = await Appointment.create({
      ...req.body,
      department: doctor.department,
    });

    const populated = await Appointment.findById(appointment._id).populate('doctorId', 'name department specialization');

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully!',
      data: populated,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Get all appointments (with filters)
// @route   GET /api/appointments
const getAppointments = async (req, res) => {
  try {
    const { doctorId, status, date, page = 1, limit = 50 } = req.query;
    const filter = {};

    if (doctorId) filter.doctorId = doctorId;
    if (status) filter.status = status;
    if (date) {
      const dateStart = new Date(date);
      dateStart.setHours(0, 0, 0, 0);
      const dateEnd = new Date(date);
      dateEnd.setHours(23, 59, 59, 999);
      filter.appointmentDate = { $gte: dateStart, $lte: dateEnd };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Appointment.countDocuments(filter);
    const appointments = await Appointment.find(filter)
      .populate('doctorId', 'name department specialization consultationFee')
      .sort({ appointmentDate: 1, timeSlot: 1 })
      .skip(skip)
      .limit(parseInt(limit));

    res.status(200).json({
      success: true,
      count: appointments.length,
      total,
      data: appointments,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Cancel an appointment
// @route   PUT /api/appointments/:id/cancel
const cancelAppointment = async (req, res) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      { status: 'CANCELLED' },
      { new: true }
    ).populate('doctorId', 'name department');

    if (!appointment) {
      return res.status(404).json({ success: false, message: 'Appointment not found' });
    }

    res.status(200).json({
      success: true,
      message: 'Appointment cancelled successfully',
      data: appointment,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get available slots for a doctor on a date
// @route   GET /api/appointments/slots/:doctorId
const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { date } = req.query;

    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      return res.status(404).json({ success: false, message: 'Doctor not found' });
    }

    const dateStart = new Date(date);
    dateStart.setHours(0, 0, 0, 0);
    const dateEnd = new Date(date);
    dateEnd.setHours(23, 59, 59, 999);

    // Count appointments per slot
    const slotCounts = await Appointment.aggregate([
      {
        $match: {
          doctorId: doctor._id,
          appointmentDate: { $gte: dateStart, $lte: dateEnd },
          status: { $ne: 'CANCELLED' },
        },
      },
      { $group: { _id: '$timeSlot', count: { $sum: 1 } } },
    ]);

    const countMap = {};
    slotCounts.forEach((s) => { countMap[s._id] = s.count; });

    const slots = doctor.availableSlots.map((slot) => ({
      time: slot,
      booked: countMap[slot] || 0,
      max: doctor.maxAppointmentsPerSlot,
      available: (countMap[slot] || 0) < doctor.maxAppointmentsPerSlot,
    }));

    res.status(200).json({ success: true, data: slots });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getAvailableSlots,
};
