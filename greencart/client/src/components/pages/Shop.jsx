import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import "../styles/styles.css"
import CardPagination from '../common/card/CardPagination';
import { SideHeading } from '../common/Text';
import { addItem } from '../../redux/slice/addToCartSlice';
import Notification from '../common/Notification/Notification';
const Shop = () => {

  const [currentMenu, setCurrentMenu] = useState("All");
  const data = useSelector((state) => state?.shopReducer?.products);
  console.log("vaaa", data)
  const dispatch = useDispatch();
  const filterCategory = ["All", ...new Set(data?.map((item) => item.category))]
  console.log(filterCategory)
  const [notification, setNotification] = useState(false);

  const handleFilterDate = (menu) => {
    setCurrentMenu(menu);
  }

  const handleAddToCart = (item) => {
    setNotification(true);
    dispatch(addItem(item));

    // Get current cart from localStorage or start with empty array
    const existingCart = JSON.parse(localStorage.getItem("addtocart")) || [];

    // Check if product already exists in localStorage cart
    const index = existingCart.findIndex((p) => p._id === item._id);

    if (index !== -1) {
      // Increase quantity if item exists
      existingCart[index].quantity += 1;
    } else {
      // Add new item with quantity = 1
      existingCart.push({ ...item, quantity: 1 });
    }

    // Save updated cart back to localStorage
    localStorage.setItem("addtocart", JSON.stringify(existingCart));
  };
  useEffect(() => {
    setTimeout(() => {
      setNotification(false)
    }, 1000)
  }, [notification])

  const filterData = currentMenu === "All" ? data : data?.filter((item) => item.category === currentMenu);
  return (
    <div className='page main-section'>
      {notification && (
        <Notification type="success" text="Value added to the cart" />
      )}
      <div className="shop-container">
        <div className="shop-content">
          <div className={`filter-container`}>
            {filterCategory?.map((fc, index) => (
              <button className={`filter ${currentMenu === fc ? 'active' : ''}`} key={index} onClick={() => {
                handleFilterDate(fc)
              }}>{fc}</button>
            ))}
          </div>
          <CardPagination data={filterData} perPageCount={8} addToCart={handleAddToCart} />
        </div>
      </div>
    </div>
  )
}

export default Shop
