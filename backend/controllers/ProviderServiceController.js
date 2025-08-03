const Service=require('../models/service')

exports.ProviderServices=async (req,res)=>{
    try{
        const providerId=req.user._id;
        const services=await Service.find({provider:providerId});
        res.status(200).json({success:true,services});
    }
    catch(err){
        res.status(500).json({success:false,message:err.message});
    }
        

}
