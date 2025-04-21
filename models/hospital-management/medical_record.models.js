import mongoose from "mongoose";

const MedicalRecordSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    expiredate:{
        type:Number,
        required:true
    }
} , {timestamps:true})

export const MedicalRecord = mongoose.model('MedicalRecord' , MedicalRecordSchema)