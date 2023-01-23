const jwt = require("jsonwebtoken")
const User = require("../model/User")

const verifyToken = async (req, res, next)=>{

    try
    {
        const token = req.cookie.token;

        const verification = jwt.verify(token, process.env.SECRET_KEY )

        const rootUser = await User.findOne({_id:verification._id, "tokens.token":token})

        if(!rootUser)
        {
            throw new Error("Usr not found")

        }

       
        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id
        req.admin = rootUser.isAdmin

        next()
    }catch(e)
    {   
        res.status(401).send("Unauthorized token access")
        console.error(e);
    }


}


module.exports=verifyToken