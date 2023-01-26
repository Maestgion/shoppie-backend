const jwt = require("jsonwebtoken")
const User = require("../model/User")

const verifyToken = async (req, res, next)=>{

    try
    {
        const token = req.cookies.jwtoken;
     

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
        // req.admin = true

        next()
    }catch(e)
    {   
        res.status(401).send("Unauthorized token accessssss")
        console.log(e);
    }


}


const verifyTokenAndAuthorization = (req, res, next)=>{
    verifyToken(req, res, ()=>{
       
       
    
        if(req.rootUser.id === req.params.id || req.admin)
        {   
            
            next()
        } 
        else {
            res.status(403).json("Unauthorized access!");
            
          }

    })
}


const verifyTokenAndAdmin = (req, res, next)=>{
    verifyToken(req, res, ()=>{
        if(req.rootUser.isAdmin)
        {
            next();
        }
        else {
            res.status(403).json("Unauthorized access!");
            
          }
    })
}


module.exports = {
    verifyToken,
    verifyTokenAndAuthorization,
    verifyTokenAndAdmin
  };




