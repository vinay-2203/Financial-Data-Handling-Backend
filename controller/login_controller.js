import { userlogin } from "../validations/login.js";
import { loginservice } from "../services/login_service.js";



export const login = async(req,res)=>{
    try{
        const data = req.body;
        const validateData = userlogin.parse(data)
        const result = await loginservice(validateData);
        console.log(result)
        res.status(200).json({
            message: "Successfully login", token: result.token, role: result.role
        });
    }
    catch(err)
    {
        return res.status(500).json({success:false,message:'Error in login Controller!',error:err.message});
    }
}