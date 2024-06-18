import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    const fetchData = async() =>{
        
        const response = await fetch(SummaryApi.viewAddToCardProduct.url, {
            method : SummaryApi.viewAddToCardProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            }
        })

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData?.data)
        }
    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const increaseQty = async(id, qty) =>{
        const response = await fetch(SummaryApi.updateCartProduct.url, {
            method : SummaryApi.updateCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id,
                quantity : qty + 1
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id, qty) =>{
        if(qty >= 2){
            const response = await fetch(SummaryApi.updateCartProduct.url, {
                method : SummaryApi.updateCartProduct.method,
                credentials : 'include',
                headers : {
                    "content-type" : "application/json"
                },
                body : JSON.stringify({
                    _id : id,
                    quantity : qty - 1
                })
            })
    
            const responseData = await response.json()
    
            if(responseData.success){
                fetchData()
            }
        }
    }

    const deleteCartProduct = async(id) =>{
        const response = await fetch(SummaryApi.deleteCartProduct.url, {
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                _id : id
            })
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
    }

    const handlePayment = async() =>{

        const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        const response = await fetch(SummaryApi.payment.url, {
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                cartItems : data
            })
        })

        const responseData = await response.json()

        if(responseData?.id){
            stripePromise.redirectToCheckout({ sessionId : responseData.id })
        }

        console.log("payment response", responseData)
    }

    const totalQty = data.reduce((previousValue, currentValue) => previousValue + currentValue.quantity, 0)
    const totalPrice = data.reduce((preve, curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice), 0)

  return (
    <div className='container mx-auto'>

        <div className='text-lg-center my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-4'>No Data</p>
                )
            }
        </div>

        <div className='d-flex flex-column flex-lg-row p-4 gapCart'>

            {/* view product */}
            <div className='w-100 viewProduct'>
                {
                    loading ? (
                        loadingCart.map((el, index) =>{
                            return(
                                <div key={el+"Add To Cart Loading"+index} className='w-100 my-2 border animate-pulse rounded loadingCart'>
                                </div>
                            )
                        })
                    ) : (
                        data.map((product, index) =>{
                            return(
                                <div key={product?._id+"Add To Cart Loading"} className='w-100 my-2 border rounded bg-white productCart'>
                                    <div className='viewProdImgCon'>
                                        <img src={product?.productId?.productImage[0]} className='p-2 object-fit-scale viewProdImg'/>
                                    </div>

                                    <div className='px-4 py-2 position-relative'>
                                        {/* delete product */}
                                        <div className='position-absolute top-0 end-0 rounded-circle p-1 deleteUpdateBtn' onClick={()=>deleteCartProduct(product?._id)}>
                                            <MdDelete />
                                        </div>

                                        <h6 className='text-lg text-capitalize ellipsis-single-line mb-0'>{product?.productId?.productName}</h6>
                                        <p className='text-capitalize viewProductCategory mb-0'>{product?.productId?.category}</p>

                                        <div className='d-flex align-item-center justify-content-between mb-0'>
                                            <p className='mb-0 text-danger font-medium text-lg'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='mb-0 font-semibold text-lg sellPrice'>{displayINRCurrency(product?.productId?.sellingPrice * product?.quantity)}</p>
                                        </div>

                                        <div className='d-flex align-item-center gap-3 mb-0 p-1'>
                                            <button type="button" className="btn btn-outline-danger p-1" onClick={()=>decreaseQty(product?._id, product?.quantity)}>-</button> 
                                            <span>{product?.quantity}</span>
                                            <button type="button" className="btn btn-outline-danger p-1" onClick={()=>increaseQty(product?._id, product?.quantity)}>+</button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    )
                }
            </div>

            {/* summary */}
            {
                data[0] && (
                    <div className='w-100 mt-5 mt-lg-0 totalProd'>
                    {
                        loading ? (
                            <div className='border animate-pulse summaryLoading'>
                            </div>
                        ) : (
                            <div className='bg-white d-grid summaryCls'>

                                <h4 className='text-white bg-danger mb-2 px-4 py-1'>Summary</h4>
                                <div className='d-flex align-items-center justify-content-between mb-1 px-4 gap-2 font-medium text-lg QtyCls'>
                                    <p className='mb-0'>Quantity</p>
                                    <p className='mb-0'>{totalQty}</p>
                                </div>

                                <div className='d-flex align-items-center justify-content-between mb-2 px-4 gap-2 font-medium text-lg QtyCls'>
                                    <p className='mb-0'>Total Price</p>
                                    <p className='mb-0'>{displayINRCurrency(totalPrice)}</p>
                                </div>

                                <button type="button" className="btn btn-secondary" onClick={handlePayment}>Payment</button>
                            </div>
                        )
                    }
                    </div>
                )
            }

        </div>
       
    </div>
  )
}

export default Cart
