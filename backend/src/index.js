import connectDB from './db/db.js';
import dotenv from 'dotenv';
import app from './app.js';

dotenv.config({
    path:'./env'
})

connectDB()
.then(() => {
    app.listen(process.env.PORT || 9000 , (error) => {
        console.log(`server is running port ${process.env.PORT}`);  
    })
})
.catch((error) => {
    console.log('MongoDB connection failed' , error);  
})

