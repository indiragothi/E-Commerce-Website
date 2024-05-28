import React from 'react'
import { CgClose } from "react-icons/cg";

const DisplayImage = ({
    imgUrl,
    onClose,
}) => {
  return (
     <div className='position-fixed top-0 bottom-0 start-0 end-0 d-flex justify-content-center align-items-center'>
        <div className='bg-white shadow-lg rounded-4 mx-auto p-4 image-container'>

            <div className='fw-bold fs-3 d-flex justify-content-end allProduct-Close-btn' onClick={onClose}>
               <CgClose />
            </div>

            <div className='d-flex justify-content-center p-4 imageSetting'>
                <img src={imgUrl} className='w-100 h-100'/>
            </div>

        </div>
     </div>
  )
}

export default DisplayImage
