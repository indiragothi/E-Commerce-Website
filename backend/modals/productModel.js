const mongoose = require('mongoose');
const slugify = require('slugify');

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
        },
        slug: {
            type: String,
            unique: true,
            // required: true,
        },
    },
    {timestamps : true}
);

// Pre-save hook to generate slug
productSchema.pre('save', function (next) {
    if (this.isModified('productName')) {
        this.slug = slugify(this.productName, { lower: true, strict: true });
    }
    next();
});

const Product = mongoose.model("product", productSchema);
module.exports = Product;
