const Service = require('../models/service.js');

exports.createService = async (req, res) => {
  try {
    const { serviceType, city, pricing, description } = req.body;

    const newService = await Service.create({
      provider: req.user.id,
      serviceType,
      city,
      pricing,
      description,
    });

    res.status(201).json({ success: true, data: newService });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get all services 
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isApproved: true }).populate('provider', 'name email');
    res.status(200).json({ success: true, data: services });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
