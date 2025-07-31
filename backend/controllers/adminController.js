const Service = require('../models/service');
const Provider = require('../models/provider');

exports.approveService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.status(200).json({ success: true, data: service });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.approveProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.status(200).json({ success: true, data: provider });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
