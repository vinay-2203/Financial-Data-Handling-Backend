import { changerole, userCreate, userDelete, statusUpdate, userExist, showAlluser } from "../services/user_service.js";
import { user } from "../validations/user.js";
import mongoose from "mongoose";


export const createUser = async (req, res) => {
    try {
        const data = req.body;
        const validateData = user.parse(data);
        const check = await userExist(validateData);
        if (check) {
            return res.status(400).json({ message: 'User Already Exist!' })
        }
        const result = await userCreate(validateData);
        return res.status(201).json({ message: 'User Create Successfully', data: result });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!', error: err.message });
    }
}

export const deleteuser = async (req, res) => {
    try {
        const Id = req.params.id;
        if (!Id || !mongoose.Types.ObjectId.isValid(Id)) {
            return res.status(400).json({
                success: false,
                message: "Invalid user ID"
            });
        }
        const result = await userDelete(Id);
        return res.status(200).json({ message: 'User Delete Successfully!', data: result });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server Error', error: err.message });
    }
}

export const updaterole = async (req, res) => {
    try {
        const Id = req.params.id;
        let data = req.body.role;
        

        if (!data) {
            return res.status(400).json({ success: false, message: 'Role is required!' });
        }

        const allowedroles = ['admin', 'viewer', 'analyst'];
        if (data) {
            data = data.trim().toLowerCase();
        }



        if (!allowedroles.includes(data)) {
            return res.status(400).json({ success: false, message: "Bad Request!" })
        }

        await changerole(data, Id);
        return res.status(200).json({ success: true, message: 'Role updated Successfully!' });
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Internal Server Error!' });
    }
}

export const statuschange = async (req, res) => {
    try {
        const data = req.body;
        const recordId = req.params.id;
        console.log(data,recordId)
        const allowedStatus = ['active', 'inactive'];
        if (!allowedStatus.includes(data.status.trim().toLowerCase())) {
            return res.status(400).json({ message: 'Bad Request!' })
        }
        const result = await statusUpdate(data, recordId);
        return res.status(200).json({ message: 'Status Change Successfully!', data: result });
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal Server Error!', error: err.message });
    }
}

export const Allusers = async (req, res) => {
    try {

        const page = req.query.page || 1;
        const limit = req.query.limit || 10;
        const result = await showAlluser(page, limit);
        if (result.totalUsers === 0) {
            return res.status(200).json({ success: true, message: 'Users not exist!' })
        }
        return res.status(200).json({ success: true, message: 'All user list!', result: result });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: 'Error in All user service', error: err.message });
    }
}