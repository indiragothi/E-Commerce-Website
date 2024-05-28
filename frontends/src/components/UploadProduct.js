import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const UploadProduct = ({
  onClose,
  fetchdata
}) => {
  const [data, setData] = useState({
    productName : "",
    brandName : "",
    category : "",
    productImage : [],
    description : "",
    price : "",
    sellingPrice : "",
  })
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
  const [fullScreenImage, setFullScreenImage] = useState("")

  const handleOnChange = (e) =>{
    const {name, value} = e.target;

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })

  }

  const handleUploadProduct = async(e) =>{
    const file = e.target.files[0]
    const uploadImageCloudinary = await uploadImage(file);

    setData((preve)=>{
      return{
        ...preve,
        productImage : [ ...preve.productImage, uploadImageCloudinary.url ]
      }
    })

  }

  const handleDeleteProductImage = async(index) =>{
    console.log("image index", index)

    const newProductImage = [...data.productImage]
    newProductImage.splice(index, 1)

    setData((preve)=>{
      return{
        ...preve,
        productImage : [...newProductImage]
      }
    })

  }

  // ****upload product****
  const handleSubmit = async(e) =>{
    e.preventDefault()

    const fetchResponse = await fetch(SummaryApi.uploadProduct.url, {
      method : SummaryApi.uploadProduct.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify(data)
    })
     
    const responseData = await fetchResponse.json()

    if(responseData.success){
      toast.success(responseData?.message)
      onClose()
      fetchdata()
    }

    if(responseData.error){
      toast.error(responseData?.message)
    }
  }

  return (
    <div className='position-fixed top-0 bottom-0 start-0 end-0 h-100 w-100 d-flex justify-content-center align-items-center uploadProduct'>
       <div className='bg-white p-4 rounded-4 w-50 h-75 overflow-hidden mb-3'>

          <div className='d-flex justify-content-between align-items-center'>
            <h5 className='fw-bold text-lg'>Upload Product</h5>
            <div className='fw-bold fs-3 allProduct-Close-btn' onClick={onClose}>
               <CgClose />
            </div>
          </div>

          <form className='d-grid overflow-y-scroll h-100 mb-5'>

            <div className='mt-3'>
              <label htmlFor='productName'>Product Name :</label>
              <div className='mt-2'>
                <input 
                  type='text' 
                  id='productName'
                  name='productName' 
                  placeholder='Enter product name' 
                  value={data.productName}
                  onChange={handleOnChange}
                  className='w-100 h-100 form-control border-2 rounded-3 p-2' 
                  style={{background : "#e2e6e9"}}
                  required
                /> 
              </div>
            </div>

            <div className='mt-3'>
              <label htmlFor='brandName'>Brand Name :</label>
              <div className='mt-2'>
                <input 
                  type='text' 
                  id='brandName'
                  name='brandName' 
                  placeholder='Enter brand name' 
                  value={data.brandName}
                  onChange={handleOnChange}
                  className='w-100 h-100 form-control border-2 rounded-3 p-2' 
                  style={{background : "#e2e6e9"}}
                  required
                /> 
              </div>
            </div>

            <div className='mt-3'>
              <label htmlFor='category'>Category :</label>
              <select required value={data.category} name='category' onChange={handleOnChange} className='form-select w-100 form-control border-2 rounded-3 mt-2 p-2' style={{background : "#e2e6e9"}}>
                <option value={""}>Select Category</option>
                {
                  productCategory.map((el, index)=>{
                    return(
                      <option value={el.value} key={el.value+index}>{el.label}</option>
                    )
                  })
                }
              </select>
            </div>

            <div className='mt-3'>
              <label htmlFor='productImage'>Product Image :</label>
              
                <div className='w-100 form-control border-2 rounded-3 mt-2 d-flex justify-content-center align-items-center product-image' style={{background : "#e2e6e9"}}>
                <label htmlFor='uploadImageInput'>
                  <div className='d-flex justify-content-center align-items-center flex-column' style={{color : "#a8b4bd"}}>
                    <span className='fs-2'><FaCloudUploadAlt/></span>
                    <p className='fs-5'>Upload Product Image</p>
                    <input type='file' id='uploadImageInput' className='visually-hidden' onChange={handleUploadProduct} />
                  </div>
                </label> 
                </div>
            
              <div>
                {
                  data?.productImage[0] ? (
                    <div className='d-flex align-items-center gap-2'>
                      {
                        data.productImage.map((el, index) =>{
                          return(
                            <div className='position-relative group-img'>

                              <img 
                                src={el} 
                                alt={el} 
                                width={80} 
                                height={80} 
                                className='border-2 rounded-2 mt-2 image-looks' 
                                style={{background : "#e2e6e9"}}
                                onClick={()=>{
                                  setOpenFullScreenImage(true)
                                  setFullScreenImage(el)
                                }}
                              />

                              <div className='position-absolute p-1 text-white bg-danger rounded-circle deleteItemBtn' onClick={()=>handleDeleteProductImage(index)}>
                                <MdDelete />
                              </div>

                            </div>
                          )
                        })
                      }
                    </div>
                  ) : (
                    <p className='text-sm' style={{color : "#8b0000"}}>*Please upload product image</p>
                  )
                }
              </div>

            </div>

            <div className='mt-3'>
              <label htmlFor='price'>Price :</label>
              <div className='mt-2'>
                <input 
                  type='number' 
                  id='price'
                  name='price' 
                  placeholder='Enter the price' 
                  value={data.price}
                  onChange={handleOnChange}
                  className='w-100 h-100 form-control border-2 rounded-3 p-2' 
                  style={{background : "#e2e6e9"}}
                  required
                /> 
              </div>
            </div>

            <div className='mt-3'>
              <label htmlFor='sellingPrice'>Selling Price :</label>
              <div className='mt-2'>
                <input 
                  type='number' 
                  id='sellingPrice'
                  name='sellingPrice' 
                  placeholder='Enter selling price' 
                  value={data.sellingPrice}
                  onChange={handleOnChange}
                  className='w-100 h-100 form-control border-2 rounded-3 p-2' 
                  style={{background : "#e2e6e9"}}
                  required
                /> 
              </div>
            </div>

            <div className='mt-3'>
              <label htmlFor='description'>Description :</label>
              <textarea 
                className='w-100 h-100 form-control border-2 rounded-3 p-2 mt-2'
                style={{background : "#e2e6e9"}} 
                rows={3}
                placeholder='Enter product description'
                name='description'
                onChange={handleOnChange}
                value={data.description}
              >
              </textarea>
               
            </div>



            <button className="btn btn-danger my-5" onClick={handleSubmit} type="button">Upload Product</button>

          </form>

       </div>


       {/* ******Display image full screen****** */}
       {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }

    </div>
  )
}

export default UploadProduct
