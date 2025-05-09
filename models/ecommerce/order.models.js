import mongoose from "mongoose";

const orderItemSchema = mongoose.Schema({
    productid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Product'
    },
    quantity:{
        type:Number,
        required:true
    }
})

const OrderSchema = mongoose.Schema({
    orderprice:{
        type:Number,
        required:true
    },
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    orderitems:{
        type:[orderItemSchema]
    },
    address:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:['PENDING' , 'CANCELLED', 'DELIVERED'],
        default:'PENDING'
    }
} , {timestamps:true})

export const Order = mongoose.model('Order' , OrderSchema)