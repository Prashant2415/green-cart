import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import HomePage from './components/pages/HomePage'
import Loader from './components/common/Loader/Loader';
import "./app.css"
import Shop from './components/pages/Shop';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import Layout from './components/pages/Layout';
import LandingPage from './components/pages/LandingPage';
import Cart from './components/pages/Cart';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllProducts } from './redux/thunk/productThunkAPI';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import Order from './components/pages/Order';
const App = () => {

  const [loaderFlag, setLoaderFlag] = useState(true);
  const dispatch = useDispatch();
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage/>,
    },
    {
      element: <Layout/>,
      children: [
        {path: "/greencart", element: <LandingPage/>},
        {path: "/shop", element: <Shop/>},
        {path: "/about", element: <About/>},
        {path: "/contact", element: <Contact/>},
        {path: "/cart", element: <Cart/>},
        {path: "/signup", element: <SignUp/>},
        {path: "/signin", element: <SignIn/>},
        {path: "/order", element: <Order/>},
      ]
    }
  ])

  useEffect(()=>{
    setTimeout(()=>{
      setLoaderFlag(false)
    },2000)
    dispatch(fetchAllProducts())
  },[])
  return (
    <>
      {loaderFlag ? <Loader/> : <RouterProvider router={router}/>}
    </>
  )
}

export default App
