import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helpers/fetchCategoryWiseProduct'
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'

const HorizontalCardProduct = ({ category, heading}) => {
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id) =>{
      await addToCart(e, id)
      fetchUserAddToCart()
    }

    const [scroll, setScroll] = useState(0)
    const scrollElement = useRef()

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

    const scrollRight = () =>{
      scrollElement.current.scrollLeft += 300;
    }

    const scrollLeft = () =>{
      scrollElement.current.scrollLeft -= 300;
    }
    
  return (
    <div className='container mx-auto px-4 my-2 position-relative'>

      <h4 className='fw-semibold py-4 mb-0'>{heading}</h4>

      <div className='d-flex align-items-center gap-4 overflow-scroll scrollbar-none' ref={scrollElement}>

        <button onClick={scrollLeft} className='bg-white rounded-circle shadow position-absolute left-0 border border-0 nextPrevBtn'><FaAngleLeft /></button> 
        <button onClick={scrollRight} className='bg-white rounded-circle shadow me-4 position-absolute end-0 border border-0 nextPrevBtn'><FaAngleRight /></button>
      {
        loading ? (
          loadingList.map((product, index)=>{

            return (
              <div className='w-100 bg-white rounded-3 shadow d-flex horizontalCard'>
                <div className='h-100 p-4 horizontalCardImg animate-pulse'>
                </div>
                <div className='p-4 d-grid w-100 gap-2'>
                    <h6 className='fw-semibold fs-5 text-black ellipsis-single-line p-1 rounded-pill animate-pulse bgColor'> </h6>
                    <p className='text-capitalize categoryText mb-1 p-1 rounded-pill animate-pulse bgColor'></p>
                    <div className='d-flex gap-3 w-100'>
                      <p className='text-danger fw-semibold p-1 w-100 rounded-pill animate-pulse bgColor'></p>
                      <p className='categoryText p-1 w-100 rounded-pill animate-pulse bgColor'><del></del></p>
                    </div>
                    <button type="button" class="btn rounded-pill w-100 bgColor animate-pulse"></button>
                </div>
            </div>
      
            )
          })
        ) : (
          data.map((product, index)=>{

            return (
              <Link to={"product/"+product?._id} className='w-100 bg-white rounded-3 shadow text-decoration-none d-flex horizontalCard'>
                <div className='h-100 p-4 horizontalCardImg'>
                    <img src={product.productImage[0]} className='object-fit-scale h-100 horizontalImg'/>
                </div>
                <div className='p-2 d-grid'>
                    <h6 className='fw-semibold fs-5 text-black mb-0 ellipsis-single-line'>{product?.productName}</h6>
                    <p className='text-capitalize categoryText mb-0'>{product?.category}</p>
                    <div className='d-flex gap-3 mb-0'>
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

export default HorizontalCardProduct
