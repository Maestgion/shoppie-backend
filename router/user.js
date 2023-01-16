const express = require("express")
const router = new express.Router()


router.get("/usertest", (req, res)=>{
    res.send("test done")
})

router.post("/userpost", (req, res)=>{
    const username = req.body.username;
    res.status(200).send(username);
})

module.exports = router;