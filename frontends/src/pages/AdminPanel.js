import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaRegUserCircle } from "react-icons/fa";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()

    useEffect(()=>{
      if(user?.role !== ROLE.ADMIN){
        navigate("/")
      }
    }, [user])

  return (
    <div className='d-md-flex pt-2 admin-page'>
       <aside className='bg-white customShadow'>
            <div className='d-flex bg-danger justify-content-center align-items-center flex-column'>
                <div className='fs-1 d-flex justify-content-center' style={{cursor : "pointer"}}>
                   {
                    user?.profilePic ? (
                       <img src={user?.profilePic} alt={user?.name} className='w-25 h-25 rounded-circle p-2 mt-2'/>
                      ) : (
                       <FaRegUserCircle />
                    )
                   }
                </div>
                <p className='text-capitalize fs-5 fw-bold'>{user?.name}</p>
                <p className='text-sm'>{user?.role}</p>
            </div>

            {/* navigation */}
            <div>
                <nav className='d-flex flex-column p-4'>
                    <Link to={"all-users"} className='text-decoration-none text-dark py-1 px-2 all-users'>All Users</Link>
                    <Link to={"all-products"} className='text-decoration-none text-dark py-1 px-2 all-users'>All Product</Link>
                </nav>
            </div>
       </aside>
       <main>
            <Outlet/>
       </main>
    </div>
  )
}

export default AdminPanel
