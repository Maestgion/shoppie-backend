const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema(
    {
        userId:
        {
            type: String,
            required: true,
        },
        products:
        [
            {
                productId:
                {
                    type: String,
                },
                quantity:
                {
                    type: Number,
                    default: 1,
                }
            }
        ],
        amount: 
        {
            type: Number, 
            required: true,
        },
        address:
        {   

            // type: String,
            // type is object here as Stripe library will return an object

            type: Object,
            required: true,
        },
        status:
        {
            type: String,
            default: "Pending"
        },
       
    }, {timestamps: true}
);

const Order = mongoose.model("order", orderSchema);
module.exports = Order;