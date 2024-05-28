import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helpers/imageTobase64'
import SummaryApi from '../common/index'
import { toast } from 'react-toastify';

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [data, setData] = useState({
      name : "",
      email : "",
      password : "",
      confirmPassword : "",
      profilePic : ""
    })
    const navigate = useNavigate();

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

      // if(data.password === data.confirmPassword){
        console.log("SummaryApi.signUP.url", SummaryApi.signUP.url)

      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method : SummaryApi.signUP.method,
        headers : {
          "content-type" : "application/json"
        },  
        body : JSON.stringify(data)
      })

      const dataApi = await dataResponse.json();

      if(dataApi.success){
        toast.success(dataApi.message)
        navigate('/login')
      }

      if(dataApi.error){
        toast.error(dataApi.message)
      }

      // console.log("data", dataApi);
    // }else{
    //   toast.error("please check password and confirm password")
    // }
  }

    const handleUploadPic = async(e) =>{
        const file = e.target.files[0]

        const imagePic = await imageTobase64(file);

        setData((prev)=>{
            return{
                ...prev,
                profilePic : imagePic
            }
        })
    }  

    // console.log("signup data", data)
  return (
    <section id='signup'>
       <div className='container p-4 m-auto'>
          <div className='bg-white p-2 py-5 mx-auto rounded-4 shadow mt-4' style={{width: "450px"}}>

            <div className='d-flex justify-content-center align-items-center mb-3 position-relative'>

                <div className=''>
                    <img src={data.profilePic || loginIcons} alt='login icons' width={"150px"} height={"150px"} className='rounded-circle'/>
                </div>

                 <form>
                    <label>
                        <div className='text-center position-absolute top-50 start-50 translate-middle rounded-circle p-5' style={{background : "#e2e6e9", width: "150px", opacity : 0.8, cursor: "pointer"}}>
                           upload photo
                        </div>
                        <input type='file' className='form-control visually-hidden' onChange={handleUploadPic}/>
                    </label> 
                 </form>

            </div>    

            <form className='p-3 d-flex flex-column gap-2' onSubmit={handleSubmit}>

              <div className='grid'>
                <label className='px-2'>FullName :</label>
                <div className='p-2'>
                  <input 
                    type='text' 
                    placeholder='Enter your name' 
                    name='name'
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    className='w-100 h-100 form-control border-0 p-2' 
                    style={{background : "#e2e6e9"}}
                  />
                </div>
              </div>

              <div className='grid'>
                <label className='px-2'>Email :</label>
                <div className='p-2'>
                  <input 
                    type='text' 
                    placeholder='Enter email' 
                    name='email'
                    value={data.email}
                    onChange={handleOnChange}
                    required
                    className='w-100 h-100 form-control border-0 p-2' 
                    style={{background : "#e2e6e9"}}
                  />
                </div>
              </div>

              <div className=''>
                <label className='px-2'>Password :</label>
                <div className='p-2 d-flex position-relative'>
                  <input 
                    type={showPassword ? "text" : "password"} 
                    placeholder='Enter password' 
                    name='password'
                    value={data.password}
                    onChange={handleOnChange}
                    required
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

              </div>

              <div className='mb-4'>
                <label className='px-2'>Confirm Password :</label>
                <div className='p-2 d-flex position-relative'>
                  <input 
                    type={showConfirmPassword ? "text" : "password"} 
                    placeholder='Enter confirm password' 
                    name='confirmPassword'
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    className='w-100 h-100 form-control border-0 p-2' 
                    style={{background : "#e2e6e9"}}
                  />
                  <div className='position-absolute top-50 end-0 translate-middle pe-2 cursor-pointer' onClick={()=>{setShowConfirmPassword((prev)=>!prev)}} >
                      <span className=''>
                        {
                          showConfirmPassword ? (
                            <FaEyeSlash />
                          ) : (
                            <FaEye />
                          )
                        }
                      </span>
                    </div>
                </div>
              </div>

              <div className='px-2 d-flex justify-content-center align-items-center'>
                <button type="submit" className="btn btn-danger rounded-4 w-25 scale-on-hover">Sign Up</button>
              </div>

            </form> 

            <p className='mt-4 ps-3'>Already Have Account? <Link to={'/login'} className='signup'>Login</Link> </p>
          </div>
       </div>
    </section>
  )
}

export default SignUp
