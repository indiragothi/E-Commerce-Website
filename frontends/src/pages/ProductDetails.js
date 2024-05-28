import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from '../helpers/displayCurrency';
import CategoryWiseProductDisplay from '../components/CategoryWiseProductDisplay';
import addToCart from '../helpers/addToCart';
import Context from '../context';

const ProductDetails = () => {
  const [data, setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : ""
  })
  const params = useParams()
  const [loading, setLoading] = useState(true)
  const productImageListLoading = new Array(4).fill(null)
  const [activeImage, setActiveImage] = useState("")
  const navigate = useNavigate()

  const [zoomImageCordinate, setZoomImageCordinate] = useState({
    x : 0,
    y : 0
  })
  const [zoomImage, setZoomImage] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  console.log("product id", params)

  const fetchProductDetails = async () =>{
    setLoading(true)
    const response = await fetch(SummaryApi.productDetails.url, {
      method : SummaryApi.productDetails.method,
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        productId : params?.id
      })
    })
    setLoading(false)
    const dataResponse = await response.json()

    setData(dataResponse?.data)
    setActiveImage(dataResponse?.data?.productImage[0])

  }

  console.log("data", data)

  useEffect(()=>{
    fetchProductDetails()
  }, [params])

  const handleMouseEnterProduct = (imageURL) =>{
    setActiveImage(imageURL)
  }

  const handleZoomImage = useCallback((e) =>{
    setZoomImage(true)
    const {left, top, width, height} = e.target.getBoundingClientRect()
    console.log("cordinate ", left, top, width, height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCordinate({
      x,
      y
    })
     
  },[zoomImageCordinate])

  const handleLeaveImageZoom = () =>{
    setZoomImage(false)
  }

  const handleAddToCart = async(e, id) =>{
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const handleBuyProduct = async(e, id) =>{
    await addToCart(e, id)
    fetchUserAddToCart()
    navigate("/cart")
  }

  return (
    <div className='container mx-auto p-4 '>
       
      <div className='d-flex flex-column flex-lg-row gap-4 productImgDetail'>
          {/* product image */}
        <div className='d-flex flex-column flex-lg-row-reverse gap-4 prodImgDet'>

          <div className='position-relative p-2 zoom-container'>

            <img src={activeImage} className='w-100 h-100 object-fit-scale bigImg' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom} />

            {/* Product zoom */}
            {
              zoomImage && (
                <div className='position-absolute overflow-hidden p-1 d-none d-md-block zoom'>
                  <div 
                    className='w-100 h-100 zoomImg'
                    style={{
                    background : `url(${activeImage})`,
                    backgroundRepeat : 'no-repeat',
                    backgroundPosition : `${zoomImageCordinate.x * 100}% ${zoomImageCordinate.y * 100}%`
                    }}
                  >
                  </div>
                </div>
              )
            }
            
          </div>

          <div className='h-100'>

            {
              loading ? ( 
                <div className='d-flex gap-2 flex-lg-column overflow-scroll scrollbar-none h-100'>
                  {
                    productImageListLoading.map((el, index) =>{
                      return(
                        <div className='rounded productImgList animate-pulse' key={"loadingImage"+index}>
                          
                        </div>
                      )
                    })
                  }
                </div>
              ) : (
                <div className='d-flex flex-lg-column gap-2 overflow-scroll scrollbar-none h-100'>
                  {
                    data?.productImage?.map((imgURL, index) =>{
                      return(
                        <div className='rounded productImgList p-1' key={imgURL}>
                          <img src={imgURL} className='w-100 h-100 object-fit-scale mix-blend smallImg' onMouseEnter={()=>handleMouseEnterProduct(imgURL)} onClick={()=>handleMouseEnterProduct(imgURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
          </div>

        </div>

        {/* produt details */}
        {
          loading ? (
            <div className='gap-1 w-100'>
              <p className='animate-pulse rounded-pill d-inline-block w-100 brandNameClsLoad'></p>
              <h3 className='fs-4 fw-medium rounded-pill animate-pulse w-100 brandNameClsLoad'></h3>
              <p className='text-capitalize categoryCls rounded-pill animate-pulse w-100 brandNameClsLoad'></p>

              <div className='d-flex align-items-center gap-1 rounded-pill animate-pulse w-100 brandNameClsLoad'>
                 
              </div>

              <div className='d-flex align-items-center gap-3 fw-medium fs-3 my-3 animate-pulse w-100 priceHeight'>
                <p className='w-100 rounded-pill animate-pulse brandNameClsLoad'> </p>
                <p className='w-100 rounded-pill animate-pulse brandNameClsLoad'> </p>
              </div>

              <div className='d-flex align-items-center my-2 gap-3'>
                <div className='rounded-pill animate-pulse w-100 brandNameClsLoad'></div>
                <div className="rounded-pill animate-pulse w-100 brandNameClsLoad"></div>
              </div>

              <div className='w-100'>
                <p className='fw-medium my-1 desc rounded-pill animate-pulse w-100 brandNameClsLoad'> </p>
                <p className='rounded-pill my-2 animate-pulse w-100 brandNameClsLoadDesc'> </p>
              </div>

            </div>
          ) : (
            <div className='d-flex flex-column gap-1'>
              <p className='px-4 py-1 rounded-pill d-inline-block brandNameCls'>{data?.brandName}</p>
              <h3 className='fs-4 fw-medium'>{data?.productName}</h3>
              <p className='text-capitalize categoryCls'>{data?.category}</p>

              <div className='d-flex align-items-center gap-1 mt-0 stars'>
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalf />
              </div>

              <div className='d-flex align-items-center gap-3 fw-medium fs-3'>
                <p className='sellingPrice'>{displayINRCurrency(data.sellingPrice)}</p>
                <p className='price'><del>{displayINRCurrency(data.price)}</del></p>
              </div>

              <div className='d-flex align-items-center gap-3'>
                <button type="button" class="btn btn-outline-danger rounded-pill px-5" onClick={(e)=>handleBuyProduct(e, data?._id)} >Buy</button>
                <button type="button" class="btn btn-danger rounded-pill px-3" onClick={(e)=>handleAddToCart(e, data?._id) }>Add To Cart</button>
              </div>

              <div>
                <p className='fw-medium my-1 desc'>Description :</p>
                <p>{data.description}</p>
              </div>

            </div>
          )
        }

      </div>


      {
        data.category && (
          <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
        )
      }

    </div>
  )
}

export default ProductDetails
