import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdClose } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChangeUserRole = ({
  name,
  email,
  role,
  userId,
  onClose,
  callfunc,
}) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChangeSelect = (e) =>{
    setUserRole(e.target.value)

    console.log("target value",e.target.value)

    // setUserRole(e.target.value);
    // // Update the user details state as well
    // setUpdateUserDetails(prevState => ({
    //   ...prevState,
    //   role: e.target.value
    // }));
  }

  const updateUserRole = async() =>{
    const fetchResponse = await fetch(SummaryApi.updateUser.url,{
      method : SummaryApi.updateUser.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },
      body : JSON.stringify({
        userId : userId,
        role : userRole,
        // name: name,
        // email: email
      })
    })

    const responseData = await fetchResponse.json();

    if(responseData.success){
      toast.success(responseData.message)
      onClose()
      callfunc()
    }
 
    console.log("role updated", responseData)
  }

  return (
    
    <div className='position-fixed top-0 bottom-0 start-0 end-0 h-100 w-100 d-flex justify-content-center align-items-center '>
      <div className='bg-white shadow pt-1 p-4 w-25'>
        <div className="d-flex justify-content-end align-items-center">
          <button type="button" className='btn btn-black fw-bold fs-4 close-btn' onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        
        <h5 className='pb-3'>Change User Role</h5>

        <p className=''>Name : {name}</p>
        <p>Email : {email}</p>
 
        <div className='d-flex justify-content-between align-items-center my-4'>
          <p>Role :</p>
          <select className='border px-4 py-1' value={userRole} onChange={handleOnChangeSelect}>
            {
              Object.values(ROLE).map(el => {
                return(
                  <option value={el} key={el} >{el}</option>
                )
              })
            }
          </select>
        </div>

        <button type="button" className="btn btn-danger rounded-pill" onClick={updateUserRole}>Change Role</button>

      </div>
    </div>
     
  )
}

export default ChangeUserRole
