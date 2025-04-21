import mongoose from "mongoose";

const HospitalSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    addressline1:{
        type:String,
        required:true
    },
    addressline1:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    },
    specializein:[
        {
            type:String
        }
    ]
} , {timestamps:true})

export const Hospital = mongoose.model('Hospital' , HospitalSchema)