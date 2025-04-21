import mongoose from "mongoose";

const admissionSchema = new mongoose.Schema({
    name:{
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
    birthdate:{
        type:Date,
        required:true,
    },
    study:{
        type:String,
        required:true,
        lowercase:true
    },
    stream:{
        type:String,
        required:true,
        lowercase:true
    }
} , {timestamps:true})

export const Addmission = mongoose.model('Addmission' , admissionSchema)