
const express = require("express")
const router = express.Router()
const STRIPE_KEY = process.env.STRIPE_SECRET_KEY
const stripe = require("stripe")(STRIPE_KEY)

router.post("/payments", (req, res)=>{
    stripe.charges.create(
        {
            source : req.body.tokenId,
            amount: req.body.amount,
            currency : 'inr'
        }, (stripeErr, stripeRes)=>{
            stripeErr ? res.status(500).json(stripeErr) : res.status(200).json(stripeRes)
        }
    )
})

module.exports = router

