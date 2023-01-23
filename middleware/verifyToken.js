const jwt = require("jsonwebtoken")
const User = require("../model/User")

const verifyToken = async (req, res, next)=>{

    try
    {
        const token = req.cookies.jwtoken;
        console.log(token)

        const verification = jwt.verify(token, process.env.SECRET_KEY )

        const rootUser = await User.findOne({_id:verification._id, "tokens.token":token})

        if(!rootUser)
        {
            throw new Error("Usr not found")

        }

       
        req.token = token
        req.rootUser = rootUser
        // req.userID = rootUser._id
        // req.admin = rootUser.isAdmin

        next()
    }catch(e)
    {   
        res.status(401).send("Unauthorized token access")
        console.log(e);
    }


}


const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.rootUser._id=== req.params.id || req.rootUser.isAdmin)
        {
            next()
        } 
        else {
            res.status(403).json("Unauthorized access!");
            
          }

    })
}



module.exports = {
    verifyToken,
    verifyTokenAndAuthorization
  };




