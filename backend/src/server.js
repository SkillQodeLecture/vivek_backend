/*

import express from 'express'

const app = express()

const port  = process.env.PORT || 3000

app.get('/' , (req , res) => {
    res.send('server is ready')
})

app.get('/api/jokes' , (req , res) => {
    const jokes = [
        {
            id:1,
            title:'1 joke',
            content:'Ha Ha Ha joke 1'
        },
        {
            id:2,
            title:'2 joke',
            content:'Ha Ha Ha joke 2'
        },
        {
            id:3,
            title:'3 joke',
            content:'Ha Ha Ha joke 3'
        },
        {
            id:4,
            title:'4 joke',
            content:'Ha Ha Ha joke 4'
        }
    ];
    res.send(jokes)
})

app.listen(port , (error) => {
    error ? console.log('Server not start'):console.log(`Server start on port ${port}`);
})

*/

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

