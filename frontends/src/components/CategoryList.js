import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { Link } from 'react-router-dom'

const CategoryList = () => {
    const [categoryProduct, setCategoryProduct] = useState([])
    const [loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)

    const fetchCategoryProduct = async() =>{
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url, {
            method : SummaryApi.categoryProduct.method
        })
        const dataResponse = await response.json()
        setLoading(false)
        setCategoryProduct(dataResponse.data)
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
        <div className='d-flex align-items-center justify-content-between gap-4 overflow-scroll scrollbar-none'>
            {
                loading ? (
                    categoryLoading.map((el, index) =>{
                        return(
                            <div className='rounded-circle overflow-hidden loadingState' key={"categoryLoading"+index}>
                            </div>
                        )
                    })
                ) : (
                    categoryProduct.map((product, index)=>{
                        return(
                            <Link to={"/product-category?category="+product?.category} className='text-decoration-none text-black categoryProduct' key={product?.category}>
                                <div className='rounded-circle overflow-hidden p-4 d-flex align-items-center justify-content-center categoryProductImg-container'>
                                    <img src={product?.productImage[0]} alt={product?.category} className='h-100 object-fit-scale categoryProductImg'/>
                                </div>
                                <p className='text-center text-sm text-capitalize'>{product?.category}</p>
                            </Link>
                        )
                    })
                )
            }
        </div>
    </div>
  )
}

export default CategoryList
