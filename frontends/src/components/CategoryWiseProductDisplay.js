import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'
import scrollTop from '../helpers/scrollTop'

const CategoryWiseProductDisplay = ({ category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id) =>{
      await addToCart(e, id)
      fetchUserAddToCart()
    }

    const fetchData = async() =>{
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setLoading(false)
      
      console.log("selling price", categoryProduct.data)
      setData(categoryProduct?.data)
    }

    useEffect(()=>{
      fetchData()
    },[])
    
  return (
    <div className='container mx-auto px-4 my-2 position-relative'>

      <h4 className='fw-semibold py-4'>{heading}</h4>

      <div className='d-grid overflow-x-scroll scrollbar-none justify-content-between responsive-grid '>

      {
        loading ? (
            loadingList.map((product, index)=>{

                return (
                  <div className='w-100 bg-white rounded-3 shadow verticalCard'>
                    <div className='p-4 d-flex justify-content-center align-items-center animate-pulse verticalCardImg'>
                      
                    </div>
                    <div className='p-4 d-grid w-100 gap-3'>
                        <h6 className='fw-semibold fs-5 text-black ellipsis-single-line p-1 rounded-pill animate-pulse bgColor py-2'> </h6>
                        <p className='text-capitalize categoryText mb-1 p-1 rounded-pill animate-pulse bgColor py-2'> </p>
                        <div className='d-flex gap-3 w-100'>
                          <p className='text-danger fw-semibold p-1 w-100 rounded-pill animate-pulse bgColor py-2'> </p>
                          <p className='categoryText p-1 w-100 rounded-pill animate-pulse bgColor py-2'></p>
                        </div>
                        <button type="button" class="btn rounded-pill py-2 w-100 animate-pulse bgColor"> </button>
                    </div>
                </div>
          
                )
            }) 
        ) : (
            data.map((product, index)=>{

                return (
                  <Link to={"/product/"+product?._id} className='w-100 bg-white rounded-3 shadow text-decoration-none verticalCard' onClick={scrollTop}>
                    <div className='p-4 d-flex justify-content-center align-items-center verticalCardImg'>
                        <img src={product.productImage[0]} className='object-fit-scale h-100 verticalImg'/>
                    </div>
                    <div className='p-4 d-grid gap-3'>
                        <h6 className='fw-semibold fs-5 text-black mb-0 ellipsis-single-line'>{product?.productName}</h6>
                        <p className='text-capitalize categoryText mb-0'>{product?.category}</p>
                        <div className='d-flex mb-0 gap-5'>
                          <p className='text-danger fw-semibold mb-0'>{ displayINRCurrency(product?.sellingPrice) }</p>
                          <p className='categoryText mb-0'><del>{ displayINRCurrency(product?.price) }</del></p>
                        </div>
                        <button type="button" class="btn btn-danger rounded-pill" onClick={(e)=>handleAddToCart(e, product?._id)}>Add to Cart</button>
                    </div>
                </Link>
          
                )
            })    
        )  
      }
      </div>

    </div>
  )
}

export default CategoryWiseProductDisplay
