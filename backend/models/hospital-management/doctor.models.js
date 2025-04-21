import mongoose from "mongoose";

const HospitalHoursSchema = mongoose.Schema({} , {})

const DoctorSchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    salary:{
        type:String,
        required:true
    },
    qualification:{
        type:String,
        required:true
    },
    experienceinyear:{
        type:Number,
        required:true,
        default:0
    },
    workinhospitals:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Hospital'
        }
    ]

}  , {timestames:true})

export const Doctor = mongoose.model('Doctor' , DoctorSchema)

