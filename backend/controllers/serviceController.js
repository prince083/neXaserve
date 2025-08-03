const service = require('../models/service.js');
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

    return res.status(201).json({ success: true, data: newService });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.deleteService=async(req,res)=>{
  try{
    const service=await Service.findById(req.params.id);
    if (!service){
      return res.status(404).json({success:false,message:"Service Not Found"})
    }

    // Optional but recommended: check if this provider owns the service
    if (service.provider.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this service' });
    }

    await Service.deleteOne({_id:req.params.id});
    return res.status(200).json({success:true,message:"Service Successfully Deleted"});
  }catch(error){
    return res.status(500).json({success:false,message:err.message});
  }
}

// get all services 
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isApproved: true }).populate('provider', 'name email');
    return res.status(200).json({ success: true, data: services });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};
