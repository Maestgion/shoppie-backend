const express = require("express");
const router = express.Router();
const Order = require("../model/Order");

const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
} = require("../middleware/verifyToken");

// create

router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);

  try {
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (e) {
    res.status(500).json(e);
  }
});

// update

router.put("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    res.status(200).json(updatedOrder);
  } catch (e) {
    res.status(500).json(e);
  }
});

// delete
router.delete("/:id", verifyTokenAndAdmin, async (req, res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "item removed"})
    }catch(e)
    {
        res.status(500).json(e)
    }
})

// get user orders

router.get("/find/:id", verifyTokenAndAuthorization, async (req, res)=>{
  try{
    
    
    const cart = await Order.findOne({userId : req.params.id});
    res.status(200).json(cart);
  }catch(e)
  { 
    console.log(e)
    res.status(500).json(e);
  }

})

// get all orders

router.get("/", verifyTokenAndAdmin, async (req, res)=>{
  try{
    const totalOrders = await Order.find()
    res.status(200).json(totalOrders)
  }catch(e)
  {
    console.log(e)
    res.status(500).json(e)
  }
})

// to get monthly income

router.get("/income", verifyTokenAndAdmin, async (req, res) =>{
    const productId = req.query.pid
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.getMonth()-1))
    const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1))  //last two months

    try{

        const income = await Order.aggregate([
            {
                $match:{ 
                    createdAt : {
                        $gte:prevMonth
                    },
                    ...(productId && {
                        products : {$elemMatch: {productId}},
                    })
                  

                }
            },

            {
                $project:{
                            month : {$month:"$createdAt"},
                            sales : "$amount", 
                }
            },

            {
                $group:{
                        _id: "$month",
                        totalSales: {$sum : "$sales"}
                }
            }
        ])

        res.status(200).json(income);

    }catch(e)
    {
        console.log(e)
        res.status(500).json(e);
    }
})

module.exports = router;



