const mongoose = require("mongoose")
const dotenv = require("dotenv")

dotenv.config({path: "./config/config.env"})

mongoose.set("strictQuery", false)

const DB = process.env.DATABASE

mongoose.connect(DB, ()=>{
    console.log("connected!!")
}, (e)=>{
    console.error(e)
})