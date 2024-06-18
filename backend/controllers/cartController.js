const asyncHandler = require("express-async-handler");
const AddToCart = require("../modals/cartModel")

const handleAddToCart = asyncHandler(async(req, res) => {
    try {
        const { productId } = req?.body;
        const currentUser = req.user;

        const isProductAvailable = await AddToCart.findOne({ productId , userId : currentUser })

        console.log("isProductAvailable ", isProductAvailable)

        if(isProductAvailable){
            return res.json({
                message : "Already exist in Add to Cart",
                success : false,
                error : true
            })
        }

        const payload = {
            productId : productId,
            quantity : 1,
            userId : currentUser,
        }

        const newAddToCart = new AddToCart(payload)
        const saveProduct = await newAddToCart.save()

        return res.json({
            data : saveProduct,
            message : "Product Added in Cart",
            success : true,
            error : false
        })
    
    } catch (error) {
        res.status(400).json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
})

const handleCountAddToCartProduct = asyncHandler(async(req, res) =>{
    try {
        const userId = req.user

        const count = await AddToCart.countDocuments({
            userId : userId
        })

        res.json({
            data : {
                count : count
            },
            message : "ok",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
})

const handleViewAddToCartProduct = asyncHandler(async(req, res) => {
    try {
        const currentUser = req.user

        const allProduct = await AddToCart.find({
            userId : currentUser
        }).populate("productId")

        res.json({
            data : allProduct,
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
})

const handleUpdateAddToCartProduct =asyncHandler(async(req, res) =>{
    try {
        const currentUserId = req.user
        const addToCartProductId = req?.body?._id

        const qty = req.body.quantity

        const updateProduct = await AddToCart.updateOne({_id : addToCartProductId }, {
            ...(qty && { quantity : qty })
        })

        res.json({
            data : updateProduct,
            message : "Product Updated",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
})

const handleDeleteAddToCartProduct = asyncHandler(async(req, res) =>{
    try {
        const currentUserId = req.user
        const addToCartProductId = req?.body?._id

        const deleteProduct = await AddToCart.deleteOne({ _id : addToCartProductId })

        res.json({
            data : deleteProduct,
            message : "Delete Product From Cart",
            success : true,
            error : false
        })
        
    } catch (error) {
        res.status(400).json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
})

module.exports = {
    handleAddToCart,
    handleCountAddToCartProduct,
    handleViewAddToCartProduct,
    handleUpdateAddToCartProduct,
    handleDeleteAddToCartProduct
}

