const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../model/User")

const {verifyTokenAndAuthorization} = require("../middleware/verifyToken")

// update account
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
   if(req.body.password)
   {
    req.body.password = bcrypt.hash(req.body.password, 10);
   }

   try{
        const updatedAccount = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new: true})

        res.status(200).json({msg: "user updated", updatedAccount})
   }catch(e)
   {
    console.error(e);
    res.status(500).json({error:e})
   }
})



module.exports= router