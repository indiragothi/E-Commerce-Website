const stripe = require('../config/stripe')
const asyncHandler = require("express-async-handler");
const User = require('../modals/userModel');

const handlePayment = asyncHandler(async(req, res) =>{
    try {
        const { cartItems } = req.body

        const userId = await User.findOne({ _id : req.user })

        const params = {
            submit_type : "pay",
            mode : "payment",
            payment_method_types : ['card'],
            billing_address_collection : 'auto',
            shipping_options : [
                {
                    shipping_rate : 'shr_1PQOa3EhCy5y7sqxsoBjAW3n'
                }
            ],
            customer_email : userId.email,
            line_items : cartItems.map((item, index) =>{
                return{
                    price_data : {
                        currency : 'inr',
                        product_data : {
                            name : item.productId.productName,
                            images : item.productId.productImage,
                            metadata : {
                                productId : item.productId._id 
                            }
                        },
                        unit_amount : item.productId.sellingPrice
                    },
                    adjustable_quantity : {
                        enabled : true,
                        minimum : 1
                    },
                    quantity : item.quantity
                }
            }),
            success_url : `${process.env.FRONTEND_URL}/success`,
            cancel_url : `${process.env.FRONTEND_URL}/cancel`
        }

        const session = await stripe.checkout.sessions.create(params)

        res.status(303).json(session)

    } catch (error) {
        res.status(400).json({
            message : error?.message || error,
            error : true,
            success : false,
        })
    }
})

module.exports = {
    handlePayment,
}