const Booking = ('../models/booking.js');

exports.createBooking = async (req, res) => {
  try {
    const { serviceId, scheduledDate } = req.body;

    const booking = await Booking.create({
      user: req.user.id,
      service: serviceId,
      scheduledDate,
    });

    res.status(201).json({ success: true, data: booking });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Get all bookings for a specific user
exports.getBookingsByUser = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.params.userId }).populate('service');
    res.status(200).json({ success: true, data: bookings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
