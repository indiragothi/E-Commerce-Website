import React, { useState } from 'react'
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from './AdminEditProduct';
import displayINRCurrency from '../helpers/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct, setEditProduct] = useState(false)

  return (
    <div className='bg-white p-3 rounded'>
        <div className='adminProductCard'>
            <div className='d-flex w-100 justify-content-center align-items-center adminProductCardImg'>
               <img src={data?.productImage[0]} alt='' height={120} width={120} className='mx-auto mb-2 h-100 adminProductCardImgProp'/>
            </div>
            <p className='text-capitalize mb-2 adminProductCardText'>{data.productName}</p>

            <div>
                <p className='fw-semibold mb-0'>
                    {
                        displayINRCurrency(data.sellingPrice)
                    }
                </p>
                <div className='d-flex justify-content-center align-items-end p-2 rounded-circle productEditBtn' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline />
                </div>
            </div>
        </div>

        {
            editProduct && (
                <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata} />
            )
        }
        
    </div>
  )
}

export default AdminProductCard
