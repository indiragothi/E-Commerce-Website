import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading, data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e, id) =>{
      await addToCart(e, id)
      fetchUserAddToCart()
    }

  return (
    <div className='d-grid gap-4 overflow-x-scroll scrollbar-none responsive-grid '>

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
                      <img src={product?.productImage[0]} className='object-fit-scale h-100 verticalImg'/>
                  </div>
                  <div className='p-4 d-grid gap-3'>
                      <h6 className='fw-semibold fs-5 text-black ellipsis-single-line mb-0'>{product?.productName}</h6>
                      <p className='text-capitalize categoryText mb-0'>{product?.category}</p>
                      <div className='d-flex gap-5 mb-0'>
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
  )
}

export default VerticalCard
