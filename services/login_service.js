import { userlogin } from '../validations/login.js';
import { Usermodel } from '../model/user.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { userCreate } from './user_service.js';
dotenv.config();





export const loginservice = async (validateData) => {
    
    try {

        const userExist = await Usermodel.findOne({ phone: validateData.phone }); // check user exit or not
        if (!userExist) {
            return res.status(404).json({ message: "Your are not registered!" })
        }
       
        const isMatch =  bcrypt.compare(validateData.password, userExist.password)
        if (!isMatch) {
           return "You password is incorrect!" 
        }

        const token = jwt.sign({ id: userExist._id, phone: userExist.phone },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1h' })

        const user = await Usermodel.findOne({phone:validateData.phone}).select("role");

        return {
            token: token,
            role: user.role
        }
    }
    catch (err) {
        throw err;
    }
}