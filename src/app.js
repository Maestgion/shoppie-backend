const express = require("express")
const app = express()
const dotenv  = require("dotenv")
const PORT = process.env.PORT
require("../db/conn")
dotenv.config({path: "./config/config.env"})

app.get("/", (req, res)=>{
    res.send("hello");
})

app.listen(PORT, ()=>{
    console.log("server up ")
})