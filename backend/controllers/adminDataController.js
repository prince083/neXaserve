const User=require("../models/user")
const Service=require("../models/service")
const Provider=require("../models/provider")

exports.ServicesAndProviders=async(req,res)=>{
    try{
        const allusers=await User.find().select('-password');
        const allservices=await Service.find().select('-password');
        const allproviders=await Provider.find().select('-password');
        res.status(200).json({
            success:true,
            allusers,
            allservices,
            allproviders
        });
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
};