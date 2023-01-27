const express = require("express")
const router = express.Router()
const Product = require("../model/Product")

const {verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin} = require("../middleware/verifyToken")
const { findByIdAndUpdate } = require("../model/Product")


// create: add product

router.post("/", verifyTokenAndAdmin, async (req, res)=>{
    const newProd = new Product(req.body)

    try{
        const savedProd = await newProd.save()
        res.status(200).json(savedProd)
    }catch(e)
    {
        res.status(500).json(e);
        
    }
})

// update 

router.put("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
            {
                $set: req.body,
            }, {new:true}) 
            
            res.status(200).json(updatedProduct)

    }catch(e)
    {
        res.status(500).json(e);

    }
})

// delete

router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Product.findByIdAndDelete(req.params.id)
        res.status(200).json({msg:"product deleted"})
    }catch(e)
    {
        res.status(500).json(e);

    }
})

// get product

router.get("/find/:id", async (req, res)=>{
    try{
        const product = await Product.findById(req.params.id)
        res.status(200).json(product)
    }catch(e)
    {
        res.status(500).json(e);

    }
})

// get all products

router.get("/", async (req, res)=>{
    const queryNew = req.query.new
    const queryCategory = req.query.category

    try{
        let products;

        if(queryNew)
        {
            products = await Product.find().sort({createdAt:-1}).limit(1)
            
        }
        else if(queryCategory)
        {
            products = await Product.find({
                categories : {
                    $in : [queryCategory],
                }
            })

        }
        else
        {
            products = await Product.find();
        }

        res.status(200).json(products)

    }catch(e)
    {
        res.status(500).json(e)
    }
})






module.exports = router

