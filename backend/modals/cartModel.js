const mongoose = require('mongoose');

const addToCartSchema = new mongoose.Schema(
    {
        productId : {
            ref : 'product',
            type: String,
        },
        quantity : {
            type: Number,
        },
        userId : {
            type: String,
        },
        
    },
    {timestamps : true}
);

const AddToCart = mongoose.model("addToCart", addToCartSchema);
module.exports = AddToCart;
