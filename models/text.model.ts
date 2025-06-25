import mongoose, { model } from "mongoose";

const TextFileSchema = new mongoose.Schema({
    text:{
        type:String,
        required:true,
    },
    fileName:{
        type:String,
        required:true,
        unique:true,
    },
    hashedPassword:{
        type:String,
        required:true,
    }
})

export const  TextFile = model("TextFile",TextFileSchema);