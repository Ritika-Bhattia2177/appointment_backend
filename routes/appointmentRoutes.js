const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');

const router = express.Router();

router.use(protect);

router.route('/')
  .post(createAppointment)
  .get(getAllAppointments);

router.route('/:id')
  .get(getAppointmentById)
  .put(updateAppointment)
  .patch(updateAppointment)
  .delete(deleteAppointment);

module.exports = router;
