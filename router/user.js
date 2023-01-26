const express = require("express")
const router = express.Router()
const bcrypt = require("bcryptjs")
const User = require("../model/User")

const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware/verifyToken")

// update account
router.put("/:id", verifyTokenAndAuthorization, async (req,res)=>{
   if(req.body.password)
   {
    req.body.password = await bcrypt.hash(req.body.password, 10);
   }

   try{
        const updatedAccount = await User.findByIdAndUpdate(req.params.id, {
            $set : req.body
        }, {new: true})

        res.status(200).json({msg: "user updated", updatedAccount})
   }catch(e)
   {
    console.error(e);
    res.status(500).json({error:"error"})
   }
})

// delete

router.delete("/:id", verifyTokenAndAuthorization, async (req,res)=>{
    try{
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"user deleted"})
    }catch(e)
    {
        res.status(500).json(e)
    }
})

// get user

router.get("/find/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const user = await User.findById(req.params.id)
        const {password, cnfPassword, ...others} = user._doc 
        res.status(200).json(others)
        console.log(others)
    }catch(e)
    {
        res.status(500).json(e);
    }
})

// get all users

router.get("/", verifyTokenAndAdmin, async (req, res)=>{
    // limiting users using query params
    const query = req.query.new
    console.log(query)
    try{
        const users = query ? await User.find({isAdmin:false}).sort({_id:-1}).limit(5) : await User.find({isAdmin:false}).sort({_id:-1})
        res.status(200).json(users);
    }catch(e)
    {
        res.status(500).json(e);

    }
})

// get user stats

router.get("/stats", verifyTokenAndAdmin, async (req, res)=>{
    const date = new Date()

    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))

    // console.log(lastYear)

    try{

        const stats = await User.aggregate([
            {
                $match: {createdAt : {$gte:lastYear}}
            },
            {
                $project:{
                    month : {$month : "$createdAt"},
                }
            },
            {
                $group:{
                    _id:"$month",
                    total: {$sum:1},
                }
            }


        ])

        res.status(200).json(stats);

    }catch(e)
    {
        res.status(500).json(e);
    }

})


module.exports= router