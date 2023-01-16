const mongoose = require("mongoose")

const prodSchema = new mongoose.Schema(
    {
        title:
        {
            type: String,
            required: true,
            unique: true,
        },
        desc:
        {
            type: String,
            required: true,
        },
        img:
        {
            type: String,
            required: true,
        },
        categories:
        {
            type: Array,
        },
        size:
        {
            type: String
        },
        colour:
        {
            type: String,
        },
        price:
        {
            type: Number,
            required: true,

        },
     
            
        

    }, {timestamps: true}
)

const Product = mongoose.model("product", prodSchema);

module.exports = Product;