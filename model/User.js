const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

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
    tokens:[
        {
            token:{
                type:String,
                required:true
            }
        }
    ]

    
},{timestamps:true});

userSchema.pre('save', async function(next){
    if(this.isModified('password'))
    {
        this.password=await bcrypt.hash(this.password, 10)
        this.cnfPassword = await bcrypt.hash(this.cnfPassword, 10)

    }
    next()
})

userSchema.methods.generateToken = async function()
{
   try{
    let generatedToken = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, process.env.SECRET_KEY)
    this.tokens = this.tokens.concat({token:generatedToken})
    await this.save()
    return generatedToken;
   }catch(e){
    console.log(e);
   }
}

const User = mongoose.model("registration", userSchema)

module.exports = User;