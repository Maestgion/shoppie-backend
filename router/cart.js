const express = require("express");
const router = express.Router();
const Cart = require("../model/Cart");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// create

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);

  try {
    const savedCart = await newCart.save();
    res.status(200).json(savedCart);
  } catch (e) {
    res.status(500).json(e);
  }
});

// update

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedCart);
  } catch (e) {
    res.status(500).json(e);
  }
});

// delete
router.delete("/:id", verifyToken, async (req, res)=>{
    try{
        await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "item removed"})
    }catch(e)
    {
        res.status(500).json(e)
    }
})

// get user cart

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res)=>{
  try{
    
    
    const cart = await Cart.findOne({userId : req.params.id});
    res.status(200).json(cart);
  }catch(e)
  { 
    console.log(e)
    res.status(500).json(e);
  }

  

})

module.exports = router;
