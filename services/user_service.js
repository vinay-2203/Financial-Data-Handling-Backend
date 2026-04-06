import { Usermodel } from "../model/user.js"
import bcrypt from 'bcrypt'
const saltrounds = 10;


async function HashedPassword(password) {
    return bcrypt.hash(password, saltrounds)
}

export const userExist = async(data)=>{
    const validateData = data;
    const result = await Usermodel.findOne({phone: validateData.phone});
    if(!result){
        return false;
    }
    return true;
}

export const userCreate = async (data) => {
    try {
        const validateData = data;
        const hashpassword = await HashedPassword(validateData.password);
        validateData.password = hashpassword;
        console.log(validateData)
        const result = await Usermodel.create(validateData)
        return result;
    }
    catch (err) {
        throw err;
    }
}

export const userDelete = async (Id) => {
    const result = await Usermodel.findOneAndDelete(Id);
    if (!result) {
        throw new Error("User not Found!");
    }
    return result;
}

export const changerole = async (data, Id) => {
    const result = await Usermodel.findOneAndUpdate(Id, { role: data }, { new: true });
    if (!result) {
        throw new Error("User not found!")
    }
    return result;
}

export const statusUpdate = async (data, Id) => {
    const toggle = data.status;
    const result = await Usermodel.findOneAndUpdate(Id, { status: toggle }, { new: true });
    if (!result) {
        throw new Error('User not Found!');
    }
    return result;

}

export const showAlluser = async(page,limit)=>{
    try{
        const skip = (page-1)*limit;

        const result = await Usermodel.find().skip(skip).limit(limit);
        const totalUsers = await Usermodel.countDocuments();
        if(result.length === 0){
            throw new Error('Users not Exist!');
        }
        return {
            data: result,
            currentPage: page,
            totalPages: Math.ceil(totalUsers/limit),
            totalUsers
        }
    }
    catch(err)
    {
        throw err;
    }
}