import React from 'react'
import LoaderIcon from "/loadertwo.webp"
import "./loader.css"
const Loader = () => {
  return (
    <div className='loader-container'>
      <img className='loader-icon' src={LoaderIcon} alt="Loader icon" />
    </div>
  )
}

export default Loader
