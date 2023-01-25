const jwt = require("jsonwebtoken")
const User = require("../model/User")

const verifyToken = async (req, res, next)=>{

    try
    {
        const token = req.cookies.jwtoken;
        console.log("nkjbhgvfc")

        const verification = jwt.verify(token, process.env.SECRET_KEY )

        const rootUser = await User.findOne({_id:verification._id, "tokens.token":token})
        console.log(rootUser._id)
        if(!rootUser)
        {
            throw new Error("Usr not found")

        }

       
        req.token = token
        req.rootUser = rootUser
        req.userID = rootUser._id
        // req.admin = rootUser.isAdmin

        next()
    }catch(e)
    {   
        res.status(401).send("Unauthorized token accessssss")
        console.log(e);
    }


}


const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        console.log(req.userID)
        console.log(req.params.id)
        if(req.userID === req.params.id || req.rootUser.isAdmin)
        {   
            console.log("yes")
            res.status(200).json({msg:"yes"})  
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




