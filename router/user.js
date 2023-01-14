const express = require("express")
const router = new express.Router()


router.get("/usertest", (req, res)=>{
    res.send("test done")
})

module.exports = router;