import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    discription:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    productImage:{
        type:String
    },
    price:{
        type:Number,
        default:0
    },
    stock:{
        type:Number,
        default:0
    },
    catagory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
} , {timestamps:true})
 
export const Product = mongoose.model('Product' , productSchema)