import { recordmodel } from "../model/record.js";


export const recordCreate = async (data) => {
    try {
        const result = await recordmodel.create(data)
        return result
    } catch (err) {
        throw err;
    }
}

export const recordDelete = async (Id,userId) => {
    const result = await recordmodel.findOneAndDelete({_id:Id});
    if (!result) {
        throw new Error("Record not Found!")
    }
    return result;
}

export const recordShow = async (page,limit) => {
    try {
        const skip = (page-1)*limit;
        const result = await recordmodel.find().skip(skip).limit(limit);
        const totalrecords = await recordmodel.countDocuments();
        return {
            data: result,
            currentPage: page,
            totalPages: Math.ceil(totalrecords/limit),
            totalrecords
        }
    }
    catch (err) {
        throw err;
    }
}

export const recordUpdate = async (data, Id) => {
    const result = await recordmodel.findOneAndUpdate({_id:Id}, data, { new: true });
    if (!result) {
        throw new Error('Record not Found!');
    }
    return result;
}