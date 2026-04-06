import mongoose from "mongoose";
const recordschema = new mongoose.Schema({
    amount: Number,
    type: { type: String, enum: ['income', 'expense'] },
    category: String,
    date: Date,
    description: String,
    // createdAt: {type: String,default: Date.now}
}, { timestamps: true })

export const recordmodel = mongoose.model("records", recordschema);