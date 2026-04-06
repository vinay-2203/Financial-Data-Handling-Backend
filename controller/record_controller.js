import { recordCreate, recordDelete, recordShow, recordUpdate } from "../services/record_service.js"
import { record } from "../validations/record.js";



export const createRecord = async (req, res) => {
    try {
        const userId = req.user_Id;
        const validaterecord = record.parse(req.body);
        const result = await recordCreate(validaterecord,userId);
        return res.status(201).json({ success: true ,message: "Record Create Successfully", data: result });
    }
    catch (err) {
        if (err.name === "ZodError") {
            return res.status(400).json({ message: "data is not in valid form" })
        }
        console.log(err)
        return res.status(500).json({ success: false ,message: "Internal Server Error!" })
    }
}
export const deleteRecord = async (req, res) => {
    try {
        const userId = req.user_Id;
        const Id = req.params.id;
        await recordDelete(Id, userId);
        return res.status(200).json({ success: true, message: 'Record Successfully Deleted!' });
    }
    catch (err) {
        return res.status(500).json({ success: false, message: err.message })
    }
}


export const showRecord = async (req, res) => {
    try {
        const page  = req.query.page || 1;
        const limit = req.query.limit || 10;
        const alldocuments = await recordShow(page,limit);
        if (!alldocuments || alldocuments.length === 0) {
            return res.status(404).json({ message: 'Record not Exist' })
        }
        return res.status(200).json({
            success: true,
            message: "All records are available!",
            size: alldocuments.length,
            data: alldocuments
        })
    }
    catch (err) {
        return res.status(500).json({success:false, message: "Internal Server error!" });
    }
}

export const updateRecord = async (req, res) => {
    try {
        const data = req.body;
        const Id = req.params.id;
        const userId = req.user_Id;
        const validateData = record.parse(data);
        const result = await recordUpdate(validateData,Id,userId)
        return res.status(200).json({success:true,message:'Record Update Successfully!',data:result});
    }
    catch (err) {
        return res.status(500).json({message:'Error',error:err.message});
    }
}