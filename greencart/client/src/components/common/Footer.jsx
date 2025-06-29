import React from 'react'
import { Link } from 'react-router-dom'
import "../styles/styles.css"
const Footer = () => {
  return (
    <div className='footer-container'>
      <div className="footer-section">
        <h4>Quick Contacts</h4>
        <p><strong>Phone:</strong><span>123-456-7890</span></p>
        <p><strong>Gmail:</strong><span>plantsstore@gmail.com</span></p>
      </div>
      <div className="footer-section">
        <h4>About Store</h4>
        <Link className='disabled-link'  onClick={(e)=>{e.preventDefault()}}>About Us</Link>
        <Link className='disabled-link'  onClick={(e)=>{e.preventDefault()}}>Q&A</Link>
      </div>
      <div className="footer-section">
        <h4>T&C</h4>
        <Link className='disabled-link'  onClick={(e)=>{e.preventDefault()}}>Terms & Conditions</Link>
        <Link className='disabled-link'  onClick={(e)=>{e.preventDefault()}}>Privacy Policy</Link>
      </div>
    </div>
  )
}

export default Footer
