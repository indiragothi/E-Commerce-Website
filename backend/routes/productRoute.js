const express = require('express');
const { 
    handleUploadProduct, 
    handleGetProduct,
    handleUpdateProduct,
    handleGetCategoryProduct,
    handleGetCategoryWiseProduct,
    handleGetProductDetails,
    handleSearchProduct,
    handleFilterProduct
} = require('../controllers/productController');

const { authToken } = require('../middlewares/authToken');

const router = express.Router();

router.post('/upload-product',authToken, handleUploadProduct)
router.get('/get-product', handleGetProduct)
router.post('/update-product',authToken, handleUpdateProduct)
router.get('/get-categoryProduct', handleGetCategoryProduct)
router.post('/category-product', handleGetCategoryWiseProduct)
router.post('/product-details', handleGetProductDetails)
router.get('/search', handleSearchProduct)
router.post('/filter-product', handleFilterProduct)


module.exports = router;