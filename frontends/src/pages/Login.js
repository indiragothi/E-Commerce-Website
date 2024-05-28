import React, { useContext, useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common/index'
import { toast } from 'react-toastify';
import Context from '../context';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({
    email : "",
    password : "",
  })
  const navigate = useNavigate();
  const {fetchUserDetails, fetchUserAddToCart} = useContext(Context);

  const handleOnChange=(e)=>{
    const { name, value } = e.target;

    setData((prev)=>{
      return{
        ...prev,
        [name] : value
      }
    })
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();

    console.log("SummaryApi.signIn.url", SummaryApi.signIn.url)

    const dataResponse = await fetch(SummaryApi.signIn.url, {
      method : SummaryApi.signIn.method,
      credentials : 'include',
      headers : {
        "content-type" : "application/json"
      },  
      body : JSON.stringify(data)
    })

    const dataApi = await dataResponse.json();
    // console.log("dataApi", dataApi)

    if(dataApi.success){
      toast.success(dataApi.message)
      navigate('/')
      fetchUserDetails()
      fetchUserAddToCart()
    }

    if(dataApi.error){
      toast.error(dataApi.message)
    }
  }

  return (
    <section id='login'>
       <div className='container p-4 m-auto'>
          <div className='bg-white p-2 py-5 mx-auto rounded-4 shadow mt-4' style={{width: "450px"}}>

            <div className='d-flex justify-content-center align-items-center mb-3'>
                <img src={loginIcons} alt='login icons'/>
            </div>  

            <form className='p-3 d-flex flex-column gap-2' onSubmit={handleSubmit}>
              <div className='grid'>
                <label className='px-2'>Email :</label>
                <div className='p-2'>
                  <input 
                    type='text' 
                    placeholder='Enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    className='w-100 h-100 form-control border-0 p-2' 
                    style={{background : "#e2e6e9"}}
                  />
                </div>
              </div>

              <div className='mb-4'>
                <label className='px-2'>Password :</label>
                <div className='p-2 d-flex position-relative'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Enter password' 
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                    className='w-100 h-100 form-control border-0 p-2' 
                    style={{background : "#e2e6e9"}}
                  />
                  <div className='position-absolute top-50 end-0 translate-middle pe-2 cursor-pointer' onClick={()=>{setShowPassword((prev)=>!prev)}} >
                      <span className=''>
                        {
                          showPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )
                        }
                      </span>
                    </div>
                </div>

                <div className='text-end pe-2'>
                  <Link to={'/forgot-password'} className='forgot-password'>
                    Forgot Password?
                  </Link>
                </div>

              </div>

              <div className='px-2 d-flex justify-content-center align-items-center'>
                <button type="submit" className="btn btn-danger rounded-4 w-25 scale-on-hover">Login</button>
              </div>

            </form> 

            <p className='mt-4 ps-3'>Don't Have Account? <Link to={'/sign-up'} className='signup'> Sign-up</Link> </p>
          </div>
       </div>
    </section>
  )
}

export default Login
