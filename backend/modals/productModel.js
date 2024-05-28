const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
    {
        productName : {
            type: String,
        },
        brandName : {
            type: String,
        },
        category : {
            type: String,
        },
        productImage : [],
        description : {
            type: String,
        },
        price : {
            type: Number,
        },
        sellingPrice : {
            type: Number,
        }
    },
    {timestamps : true}
);

const Product = mongoose.model("product", productSchema);
module.exports = Product;
