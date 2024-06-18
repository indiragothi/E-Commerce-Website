const express = require('express');
const { 
    handlePayment 
} = require('../controllers/orderController');

const { authToken } = require('../middlewares/authToken');

const router = express.Router();

// payment and order
router.post('/checkout',authToken, handlePayment)

module.exports = router;