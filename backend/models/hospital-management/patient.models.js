import mongoose from "mongoose";

const PatientSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase:true
    },
    diagnosewith:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    },
    bloodgroup:{
        type:String,
        required:true
    },
    gender:{
        type:String,
        enem:['MALE' , 'FEMALE' , "OTHER"],
        required:true
    },
    admittedin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Hospital'
    }
} , {timestamps:true})

export const Patient = mongoose.model('Patient' , PatientSchema)