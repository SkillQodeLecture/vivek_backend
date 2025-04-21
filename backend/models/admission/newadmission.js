import mongoose from "mongoose";

const AddmissionNewSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        lowercase:true
    },
    middlename:{
        type:String,
        required:true,
        lowercase:true
    },
    lastname:{
        type:String,
        required:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true
    },
    phoneno:{
        type:Number,
        required:true,
    },
    address:{
        type:String,
        required:true,
        lowercase:true
    },
    dob:{
        type:Date,
        required:true,
    },
    coursedetails:{
        type:String,
        required:true,
        lowercase:true
    }
} , {timestamps:true})

export const AddmissionNew = mongoose.model('AddmissionNew' , AddmissionNewSchema)