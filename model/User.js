const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
    name:
    {
        type:String,
        required: true,
    },
    lastName:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique:true,
    },
    email:{
        type:String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    cnfPassword:{
        type:String,
        required: true
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    
    

    
},{timestamps:true});

const User = mongoose.model("registration", userSchema)

module.exports = User;