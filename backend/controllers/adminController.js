const Service = require('../models/service');
const Provider = require('../models/provider');

exports.approveService = async (req, res) => {
  try {
    const service = await Service.findByIdAndUpdate(req.params.id, { isApproved: true }, { new: true });
    res.status(200).json({ success: true, data: service, message:"Service Approved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.approveProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(req.params.id, { isVerified: true }, { new: true });
    res.status(200).json({ success: true, data: provider, message:"Provider Approved" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
