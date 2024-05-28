import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [openUploadProduct, setOpenUploadProduct] = useState(false)
  const [allProduct, setAllProduct] = useState([])

  const fetchAllProduct = async() =>{
    const response = await fetch(SummaryApi.allProduct.url, {
      method : SummaryApi.allProduct.method,
    })

    const dataResponse = await response.json()

    setAllProduct(dataResponse?.data || [])
  }

  useEffect(()=>{
    fetchAllProduct()
  },[])

  return (
    <>
      <div className='bg-white py-2 px-4 m-2 d-flex justify-content-between align-items-center all-product-cls'>
        <h4 className=''>All Product</h4>
        <button type="button" class="btn btn-outline-danger rounded-pill" onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
      </div>

      {/* all product */}
      <div className='d-flex align-items-center flex-wrap gap-3 p-4 overflow-y-scroll allProduct'>
        {
          allProduct.map((product, index) =>{
            return(
              <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
            )
          })
        }

      </div>

      {/* upload product component */}
      {
        openUploadProduct && (
          <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchdata={fetchAllProduct}
          />
        )
      }
       
    </>
  )
}

export default AllProducts
