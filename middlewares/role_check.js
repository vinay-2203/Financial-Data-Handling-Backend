import { Usermodel } from "../model/user.js";




export const rolecheckservice = async(req,res,next)=>{
    try{
        const phone = req.user.phone;
        const user = await Usermodel.findOne({phone,status:'active'}).select("role status");
        if(!user){
            return res.status(404).json({message:"User not exits or inactive!"})
        }
        req.role = user.role;
        next()

    }catch(err){
        return res.status(500).json({message:"Error",error:err.message})
    }
}