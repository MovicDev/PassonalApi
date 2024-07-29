const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotenv  =require("dotenv")
const router = require("./routes/user.route")
dotenv.config()
const cors = require('cors')

const PORT = process.env.PORT
const URI  = process.env.URI
app.use(express.urlencoded({extended:true}))
app.use(cors())


app.use(express.json())
app.use("/",router) 

// Mongoose 
app.listen(PORT, ()=>{
    mongoose.connect(URI).then(()=>{
        console.log(`App is running on port ${PORT} Database connected`);
    }).catch((error)=>{
        console.log("database error");
        console.log(error);
    })
})