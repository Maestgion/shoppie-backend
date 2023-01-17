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

userSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password, 10)
        this.cnfPassword = await bcrypt.hash(this.cnfPassword, 10)

    }
    next()
})

const User = mongoose.model("registration", userSchema)

module.exports = User;