import mongoose from "mongoose";
import { YOUTUBE } from "../constants.js";

const connectDB = async() => {
    try{
        const connectRes = await mongoose.connect(`${process.env.MONGODB_URI}/${YOUTUBE}`)
        console.log(`\n MongoDB connected !! DB HOST:${connectRes.connection.host}`);
    }
    catch(error){
        console.log('MongoDB connection error' , error);
        process.exit(1)
    }
}

export default connectDB