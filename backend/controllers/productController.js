const uploadProductPermission = require('../helpers/permission');
const Product = require('../modals/productModel')
const asyncHandler = require("express-async-handler");
 
// upload product
const handleUploadProduct = asyncHandler(async(req, res) =>{
    try {
        const sessionUserId = req.user

        if(!uploadProductPermission(sessionUserId)){
            throw new Error("Permission denied")
        }

        const uploadProduct = new Product(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            data : saveProduct,
            message : "Product uploaded successfully",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

const handleGetProductBySlug = asyncHandler(async (req, res) => {
    try {
        const { slug } = req.params;
        const product = await Product.findOne({ slug });

        if (!product) {
            res.status(404).json({
                message: "Product not found",
                error: true,
                success: false,
            });
            return;
        }

        res.status(200).json({
            data: product,
            message: "Product fetched successfully",
            success: true,
            error: false,
        });

    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            error: true,
            success: false,
        });
    }
});


// get product

const handleGetProduct = asyncHandler(async(req, res) =>{
    try {
        const allProduct = await Product.find().sort({ createdAt : -1 })

        res.status(201).json({
            data : allProduct,
            message : "All product",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

// update product
const handleUpdateProduct = asyncHandler(async(req, res) =>{
    try {
        if(!uploadProductPermission(req.user)){
            throw new Error("Permission denied")
        }

        const { _id, ...resBody } = req.body;

        const updateProduct = await Product.findByIdAndUpdate(_id, resBody)

        res.json({
            data : updateProduct,
            message : "Product update successfully",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

const handleGetCategoryProduct = asyncHandler(async(req, res) =>{
    try {
        const productCategory = await Product.distinct("category")

        console.log("category", productCategory)

        //array to store one product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await Product.findOne({category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            data : productByCategory,
            message : "Category Product",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

const handleGetCategoryWiseProduct = asyncHandler(async(req, res) =>{
    try {
        const { category } = req?.body || req?.query
        const product = await Product.find({ category })

        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })

    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

const handleGetProductDetails = asyncHandler(async(req, res) =>{
    try {
        // const { productId } = req.body
        const { slug } = req.params;

        // const product = await Product.findById(productId)
        const product = await Product.findOne({ slug });
 
        res.json({
            data : product,
            message : "Ok",
            success : true,
            error : false
        })

    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

const handleSearchProduct = asyncHandler(async(req, res) =>{
    try {
        const query = req.query.q

        const regex = new RegExp(query, "i", "g")

        const product = await Product.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })

        res.json({
            data : product,
            message : "Search Product List",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

const handleFilterProduct = asyncHandler(async(req, res) =>{
    try {
        const categoryList = req?.body?.category || []

        const product = await Product.find({
            category : {
                "$in" : categoryList
            }
        })

        res.json({
            data : product,
            message : "Product",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error.message || error,
            error : true,
            success : false,
        })
    }
})

module.exports = {
    handleUploadProduct,
    handleGetProductBySlug,
    handleGetProduct,
    handleUpdateProduct,
    handleGetCategoryProduct,
    handleGetCategoryWiseProduct,
    handleGetProductDetails,
    handleSearchProduct,
    handleFilterProduct
}