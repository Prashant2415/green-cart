import React from 'react'
import Header from '../common/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../common/Footer'
import "../styles/styles.css"
const Layout = () => {

  const getShowValue = localStorage.getItem("explorebutton");
  console.log("s", getShowValue)
  return (
    <div>
      <Header/>
      <div className="main-container">
        <Outlet/>
      </div>
      <Footer/>
    </div>
  )
}

export default Layout
