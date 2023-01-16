const express = require("express")
const app = express()
const dotenv  = require("dotenv")
require("../db/conn")
dotenv.config({path: "./config/config.env"})
const PORT = process.env.PORT

const userRoute = require("../router/user") 


app.use(express.json())
app.use("/api/users", userRoute )

app.listen(PORT, ()=>{
    console.log("server up ")
})