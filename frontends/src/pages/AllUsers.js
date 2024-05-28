import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdModeEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
  const [allUser, setAllUsers] = useState([])
  const [openUpdateRole, setOpenUpdateRole] = useState(false)
  const [updateUserDetails, setUpdateUserDetails] = useState({
    name : "",
    email : "",
    role : "",
    _id : "",
  })

  const fetchAllUsers = async() =>{
    const fetchData = await fetch(SummaryApi.allUser.url, {
      method : SummaryApi.allUser.method,
      credentials : 'include'
    })

    const dataResponse = await fetchData.json()

    if(dataResponse.success){
      setAllUsers(dataResponse.data)
    }

    if(dataResponse.error){
      toast.error(dataResponse.message)
    }

  }

  useEffect(()=>{
    fetchAllUsers()
  }, [])

  return (
    <div className=''>
      <table className='bg-white m-2 table border border-dark text-center userTable'>
        <thead className=''>
          <tr className=''>
            <th className='bg-black text-white' scope="col">S.No.</th>
            <th className='bg-black text-white' scope="col">Name</th>
            <th className='bg-black text-white' scope="col">Email</th>
            <th className='bg-black text-white' scope="col">Role</th>
            <th className='bg-black text-white' scope="col">Created Date</th>
            <th className='bg-black text-white' scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {
            allUser.map((el, index) => {
              return (
                <tr>
                  <td>{index+1}.</td>
                  <td>{el?.name}</td>
                  <td>{el?.email}</td>
                  <td>{el?.role}</td>
                  <td>{moment(el?.createdAt).format('LL')}</td>
                  <td>
                    <button type='button' className='btn cursor-pointer rounded-circle edit-button'
                      onClick={()=>{
                        setUpdateUserDetails(el)
                        setOpenUpdateRole(true)
                      }}
                      >
                        <MdModeEdit />
                    </button>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>

      {
        openUpdateRole && (
          <ChangeUserRole 
            onClose={()=>setOpenUpdateRole()}
            name={updateUserDetails.name}
            email={updateUserDetails.email}
            role={updateUserDetails.role}
            userId={updateUserDetails._id}
            callfunc={fetchAllUsers}
            // setUpdateUserDetails={setUpdateUserDetails}
          />
        )
      }

    </div>
    
  )
}

export default AllUsers
