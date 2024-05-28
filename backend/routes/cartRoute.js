const express = require('express');
const { 
    handleAddToCart, 
    handleCountAddToCartProduct,
    handleViewAddToCartProduct,
    handleUpdateAddToCartProduct,
    handleDeleteAddToCartProduct
} = require('../controllers/cartController');

const { authToken } = require('../middlewares/authToken');

const router = express.Router();

// User add to cart
router.post("/addtocart", authToken, handleAddToCart)
router.get("/countAddToCart", authToken, handleCountAddToCartProduct)
router.get("/view-card-product", authToken, handleViewAddToCartProduct)
router.post("/update-cart-product", authToken, handleUpdateAddToCartProduct)
router.post("/delete-cart-product", authToken, handleDeleteAddToCartProduct)

module.exports = router;