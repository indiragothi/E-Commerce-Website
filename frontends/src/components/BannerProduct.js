import React, { useEffect, useState } from 'react'
import image1 from '../assest/banner/img1.webp'
import image2 from '../assest/banner/img2.webp'
import image3 from '../assest/banner/img3.jpg'
import image4 from '../assest/banner/img4.jpg'
import image5 from '../assest/banner/img5.webp'

import image1Mobile from '../assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";


const BannerProduct = () => {
    const [currentImage, setCurrentImage] = useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = () =>{
        if(desktopImages.length - 1 > currentImage){
            setCurrentImage(preve => preve + 1)
        }  
    }

    const preveImage = () =>{
        if(currentImage !== 0){
            setCurrentImage(preve => preve - 1)
        }  
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
            if(desktopImages.length - 1 > currentImage){
                nextImage()
            }else{
                setCurrentImage(0)
            }
        }, 5000)

        return ()=> clearInterval(interval)
    },[currentImage])

  return (
    <div className='container mx-auto px-4'>
        <div className='w-100 position-relative bannerProduct'>

            <div className='position-absolute z-1 h-100 w-100 d-flex align-items-center nextPrevBtn'>
                <div className='w-100 d-flex justify-content-between fs-5'>
                    <button onClick={preveImage} className='bg-white rounded-circle shadow-md border border-0'><FaAngleLeft /></button> 
                    <button onClick={nextImage} className='bg-white rounded-circle shadow-md border border-0'><FaAngleRight /></button>
                </div>
            </div>

            {/* desktop and tablate version */}
            <div className='d-md-flex h-100 w-100 overflow-hidden d-none'>
             {
                desktopImages.map((imageURL, index)=>{
                    return(
                        <div className='w-100 h-100 bannerImg' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}} >
                            <img src={imageURL} alt={imageURL} className='w-100 h-100'/>
                        </div>
                    )
                })
             }
            </div>

            {/* for mobile version */}
            <div className='d-md-none h-100 w-100 overflow-hidden'>
             {
                mobileImages.map((imageURL, index)=>{
                    return(
                        <div className='w-100 h-100 bannerImg' key={imageURL} style={{transform : `translateX(-${currentImage*100}%)`}} >
                            <img src={imageURL} alt={imageURL} className='w-100 h-100 object-fit-cover'/>
                        </div>
                    )
                })
             }
            </div>

        </div>
    </div>
  )
}

export default BannerProduct
