import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () =>{
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method : SummaryApi.current_user.method,
      credentials : 'include',
    })

    const dataApi = await dataResponse.json();

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
    // console.log("data-user", dataResponse)
  }

  const fetchUserAddToCart = async() =>{
    const response = await fetch(SummaryApi.countAddToCartProduct.url, {
      method : SummaryApi.countAddToCartProduct.method,
      credentials : 'include'
    })

    const dataApi = await response.json();

    setCartProductCount(dataApi?.data?.count) 

  }

  useEffect(()=>{
    // user details
    fetchUserDetails(); 
    // user cart product
    fetchUserAddToCart();

  }, [])

  return (
    <>
    <Context.Provider value={{
      fetchUserDetails,// user detail fetch 
      cartProductCount, //current user add to cart product count
      fetchUserAddToCart,
    }}>

      <ToastContainer
         className='position-fixed top-0 start-50 translate-middle-x p-3'
      />
        <Header/>
          <main className='app-main pt-5'>
            <Outlet/>
          </main>
        <Footer/>
    </Context.Provider>
    </>
  );
}

export default App;
