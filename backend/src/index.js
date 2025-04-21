import mongoose from 'mongoose';
import connectDB from './db/db.js';
import dotenv from 'dotenv';

dotenv.config({
    path:'./env'
})

connectDB();

/*
import express from 'express';
const app = express()

;(async() => {
    try{
      await  mongoose.connect(`${process.env.MONGODB_URI}/${YOUTUBE}`)
      app.on('error' , () => {
        console.log("error db" , error)
        throw error
      })
      app.listen(process.env.PORT , (error) => {
        console.log(`App is listening port ${process.env.PORT}`);
        
      })
    }
    catch(error){
        console.log(error);
        throw error
        
    }
})()

*/