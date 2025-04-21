import mongoose from "mongoose";

const SingleAddmissionSchema = mongoose.Schema({
    fullname:{
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

export const  SingleAddmission = mongoose.model('SingleAddmission' , SingleAddmissionSchema)