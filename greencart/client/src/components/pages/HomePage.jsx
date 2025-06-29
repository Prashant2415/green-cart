import React, { useState } from 'react'
import PrimaryBackground from "/primarybackground.jpg"
import "../styles/styles.css"
import LandingPage from './LandingPage';
import { useNavigate } from 'react-router-dom';
const HomePage = ({ loader }) => {
  const navigate = useNavigate();
  const handleExplore =()=>{
    navigate("/greenCart");
  }
  return (
    <div>
      <div page>
        <img className={`primary-background ${!loader ? "loader" : ""}`} src={PrimaryBackground} alt="Primary Background"/>
        <button className='explore-button' onClick={handleExplore}>Explore</button>
      </div>
    </div>
  )
}

export default HomePage
