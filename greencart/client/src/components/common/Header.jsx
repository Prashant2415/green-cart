import React, { useEffect, useState } from 'react'
import { GiFlowerPot } from "react-icons/gi"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useSelector } from 'react-redux';
import axios from 'axios';
import { logout } from '../../utils/userUtils';
import "../styles/styles.css"
const Header = () => {

    const [scrolled, setScrolled] = useState(false);
    const cartCount = useSelector((state) => state?.addToCartReducer?.count)
    const navigate = useNavigate();
    const location = useLocation();

    const tokenValue = JSON.parse(localStorage.getItem("token"));

    const handleLogout = async()=>{
        const res = await logout();
        localStorage.removeItem("token");
        localStorage.removeItem("userDetail");
        window.location.reload();
    }

    const isActive = (path) => location.pathname.startsWith(path);
    console.log(isActive);
    console.log(location.pathname)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return (
        <div className={`header-container ${scrolled ? 'scrolled' : ''}`}>
            <div className="logo-container">
                <GiFlowerPot className='logo' size={40} />
            </div>
            <div className="header-link-container">
                <Link className={`nav-links ${location.pathname === '/greencart'? 'active-link' : '' }`} to="/greencart">Home</Link>
                <Link className={`nav-links ${location.pathname === '/shop' ? 'active-link' : '' }`} to="/shop">Catalog</Link>
                <Link className={`nav-links disabled-link ${location.pathname === '/contact' ? 'active-link' : '' }`} to="/contact" onClick={(e)=>{e.preventDefault()}}>Contact</Link>
                <Link className={`nav-links disabled-link ${location.pathname === '/about' ? 'active-link' : '' }`} to="/about"  onClick={(e)=>{e.preventDefault()}}>About</Link>
            </div>
            <div className="signin-container">
                <button className='cart-button' onClick={() => { navigate("/cart") }}>
                    <sup className='sup'>{cartCount || ""}</sup> <AiOutlineShoppingCart className='cart-icon' />
                </button>
                <button className='order-button' onClick={()=>{navigate("/order")}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-basket order-icon" viewBox="0 0 16 16">
                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9zM1 7v1h14V7zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5m2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5" />
                    </svg>
                </button>
                {!tokenValue && <button className='signin-button' onClick={() => { navigate("/signup") }}>Sign Up</button>}
                {tokenValue && <button className='signin-button' onClick={handleLogout}>Logout</button>}
            </div>
        </div>
    )
}

export default Header
