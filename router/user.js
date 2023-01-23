const express = require("express")
const router = express.Router()

const verifyToken = require("../middleware/verifyToken")

router.put("/:id", verifyToken, (req,res)=>{
    if(req.userId === req.params.id || req.admin)
    {
        
    }
})



module.exports= router