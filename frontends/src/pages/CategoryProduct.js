import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard';
import SummaryApi from '../common';

const CategoryProduct = () => {
    const [data, setData] = useState([])
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const location = useLocation()
    const search = useParams
    const urlsearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlsearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el => {
      urlCategoryListObject[el] = true
    })

    const [selectCategory, setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList, setFilterCategoryList] = useState([])

    const [sortBy, setSortBy] = useState("")

    const fetchData = async() =>{
      const response = await fetch(SummaryApi.filterProduct.url, {
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()

      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) =>{
      const { name, value, checked } = e.target

      setSelectCategory((preve) =>{
        return{
           ...preve,
          [value] : checked
        }
      })  
    }
    
    useEffect(()=>{
      fetchData()
    }, [filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el, index) =>{
        if((arrayOfCategory.length - 1) === index){
          return `category=${el}`
        }
        return `category=${el}&&`
      })
      
      navigate("/product-category?"+urlFormat.join(""))
       
    }, [selectCategory])

    const handleOnChangeSortBy = (e) =>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a, b) => a.sellingPrice - b.sellingPrice))
      }
      if(value === 'dsc'){
        setData(preve => preve.sort((a, b) => b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    }, [sortBy])

  return (
    <div className='container mx-auto p-4'>

      {/* desktop version */}
      <div className='d-none d-lg-grid custom-grid'>

        {/* left side */}
        <div className='bg-white p-2 custom-left-hide overflow-y-scroll'>

          {/* sort by */}
          <div className=''>
            <h3 className='fext-base text-uppercase font-medium border-bottom pb-1'>Sort by</h3>

            <form className='text-sm d-flex flex-column gap-2 py-2'>
              <div className='d-flex align-items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                <label>Price - Low to High</label>
              </div>

              <div className='d-flex align-items-center gap-3'>
                <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                <label>Price - High to Low</label>
              </div>
            </form>
          </div>

           {/* filter by */}
          <div className=''>
            <h3 className='fext-base text-uppercase font-medium border-bottom pb-1'>Category</h3>

            <form className='text-sm d-flex flex-column gap-2 py-2'>
               {
                productCategory.map((categoryName, index)=>{
                  return(
                    <div className='d-flex align-items-center gap-3'>
                      <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory}/>
                      <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                    </div>
                  )
                })
               }
            </form>
          </div>
          
        </div>


        {/* right side (product) */}
        <div className='px-4'>
          <h3 className='font-medium text-lg my-2 searchResults'>Search Results : {data.length}</h3>

          <div className='overflow-y-scroll searchResultsView'>
            {
              data.length !== 0 && !loading && (
                <VerticalCard data={data} loading={loading}/>
              )
            }
          </div>
        </div>

      </div>

    </div>
  )
}

export default CategoryProduct
