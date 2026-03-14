const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAppointments,
  cancelAppointment,
  getAvailableSlots,
} = require('../controllers/appointmentController');

router.route('/').post(bookAppointment).get(getAppointments);
router.route('/slots/:doctorId').get(getAvailableSlots);
router.route('/:id/cancel').put(cancelAppointment);

module.exports = router;
