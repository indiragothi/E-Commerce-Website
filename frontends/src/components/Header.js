import React , { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegUserCircle } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify'
import { setUserDetails } from '../store/userSlice';
import ROLE from '../common/role';
import Context from '../context';

const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay,setMenuDisplay] = useState(false)
  const navigate = useNavigate()
  const context = useContext(Context)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search, setSearch] = useState(searchQuery)

  const handleLogout = async() =>{
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method : SummaryApi.logout_user.method,
      credentials : 'include',
    })

    const data = await fetchData.json();

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }
  }

  const handleSearch = (e) =>{
    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }else{
      navigate("/search")
    }
  }

  return (
    <div className='container-fluid p-0 '>
    <header className='shadow-lg bg-white position-fixed w-100 z-1 header-page'>
      <div className='h-100 container mx-auto d-flex justify-content-between align-items-center '>
        <div className=''>
          <Link to={"/"}>
            <Logo w={100} h={60}/>
          </Link>
        </div>

        <div className='d-none d-lg-flex align-items-center w-25 justify-content-between border rounded-pill ps-3 focus-within-shadow'>
          <input type='text' placeholder='Search product here...' className='w-100 border-0' onChange={handleSearch}  value={search}/>
          <div className='bg-danger w-25 d-flex justify-content-center align-items-center rounded-end-pill text-white p-2'>
            <GrSearch />
          </div>
        </div>

        <div className='d-flex align-items-center gap-4'>

          <div className='position-relative d-flex justify-content-center'>
            {
              user?._id && (
                <div className='fs-3' style={{cursor : "pointer"}} onClick={()=>setMenuDisplay(prev => !prev)}>
                {
                  user?.profilePic ? (
                    <img src={user?.profilePic} alt={user?.name} className='rounded-circle profile-img'/>
                  ) : (
                    <FaRegUserCircle />
                  )
                }
              </div>
              )
            }
            

            {
              menuDisplay && (
                <div className='position-absolute p-2 rounded-3 shadow-lg admin-panel'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={"/admin-panel/all-products"} className='text-decoration-none p-2 text-dark admin-panel-link' onClick={()=>setMenuDisplay(prev => !prev)}>Admin Panel</Link>
                      )
                    }
                  </nav>
                </div>
              )
            }

      
          </div>

          {
            user?._id && (
              <Link to={"/cart"} className="fs-4 position-relative text-decoration-none text-dark">
                <span className=' '><FaShoppingCart /></span>
  
                <div class="position-absolute top-0 start-100 translate-middle badge d-flex align-items-center justify-content-center rounded-circle bg-danger fs-6 shoppingCart">
                  <span className=''>{context?.cartProductCount}</span>
                </div>
              </Link>
            )
          }


          <div className=''>
            {
              user?._id ? (   
                <button onClick={handleLogout} className="btn btn-outline-danger rounded-5">Logout</button>
              )
              : (
                <Link to={"/login"} type="button" className="btn btn-outline-danger rounded-5">Login</Link>
              )
            }
          </div>

        </div>
      </div>

    </header>
    </div>
  )
}

export default Header
