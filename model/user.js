import mongoose from "mongoose"
const Userschema = new mongoose.Schema({
    name: String,
    email: String,
    phone: { type: String, unique: true },
    role: { type: String, enum: ["viewer", "analyst", "admin"], default: "viewer" },
    status: { type: String, default: "active" },
    password: String,

}, { timestamps: true })



export const Usermodel = mongoose.model('user', Userschema);