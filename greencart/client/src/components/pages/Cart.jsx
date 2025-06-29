import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "../styles/styles.css";
import { clearCartItem, decrement, increment, removeItem } from '../../redux/slice/addToCartSlice';
import { useNavigate } from 'react-router-dom';
import axios from "axios"
import Notification from '../common/Notification/Notification';
const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector(state => state?.addToCartReducer.cartData || []);
  const userDetail = JSON.parse(localStorage.getItem("userDetail"));
  console.log(userDetail)
  const userId = userDetail?.data?._id
  const tokenValue = JSON.parse(localStorage.getItem("token"));
  const navigate = useNavigate();
  const [notification, setNotification] = useState(false);
  // Sync localStorage when cartData changes
  useEffect(() => {
    localStorage.setItem("addtocart", JSON.stringify(cartData));
  }, [cartData]);

  const handleRemoveItem = (item) => {
    setNotification(true);
    dispatch(removeItem(item));
  };

  const handleIncrement = (item) => {
    dispatch(increment(item));
  };

  const handleDecrement = (item) => {
    dispatch(decrement(item));
  };

  const totalAmount = cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)

  // inside your Cart component...
  const handlePayment = async () => {
    if (!tokenValue) {
      navigate("/signup");
      return;
    }

    try {
      const payload = {
        userId: userId,
        products: cartData.map((item) => ({
          productId: item._id,  // ensure this is the product ID from DB
          quantity: item.quantity,
        })),
        totalAmount: totalAmount,
        paymentMethod: "UPI",
        paymentStatus: "Pending"
      };

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_LINK}/api/cart/addCartandBilling`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`,
            "Content-Type": "application/json"
          }
        }
      );
      localStorage.removeItem("addtocart");
      dispatch(clearCartItem());
      alert("Cart saved successfully! Proceeding to Checkout...");
      // you can redirect to a payment or summary page here
      // navigate("/greencart"); // or any route you want

      navigate("/order")

    } catch (error) {
      console.error("Error saving cart:", error);
      alert("Failed to save cart. Please try again.");
    }
  };
  useEffect(() => {
    setTimeout(() => {
      setNotification(false);
    }, 1000)
  }, [notification])




  return (
    <div className='page page-section'>
      {notification && (
        <Notification type="remove" text="Value removed from the cart" />
      )}
      <h2 style={{ padding: "0rem 7rem" }}>My Cart</h2>
      <div className="cart-content-container">
        <div className="cart-container">
          {cartData.length > 0 ? (
            <div className="card-item-container">
              <table>
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartData.map((d, index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={d.imageURL}
                          alt={d.name}
                          style={{ width: '50px', height: '50px' }}
                        />
                      </td>
                      <td>{d.name}</td>
                      <td>
                        <button className='quantity-button' onClick={() => handleDecrement(d)} disabled={d.quantity <= 1}>-</button>
                        <span style={{ margin: '0 10px' }}>{d.quantity}</span>
                        <button className='quantity-button' onClick={() => handleIncrement(d)}>+</button>
                      </td>
                      <td>₹{d.price}</td>
                      <td>
                        <button className='remove-button' onClick={() => handleRemoveItem(d)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="red" className="bi bi-trash-fill remove-icon" viewBox="0 0 16 16">
                            <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className='empty-cart-message'>No data added to the cart</p>
          )}
        </div>

        {/* Billing Summary */}
        <div className="billing-container">
          <div className="billing">
            <h3>Order Summary</h3>
            <table className="billing-table">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Quantity × Price</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((d, index) => (
                  <tr key={index}>
                    <td>{d.name}</td>
                    <td>{d.quantity} × ₹{d.price}</td>
                    <td>₹{d.quantity * d.price}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="2" style={{ textAlign: "right", fontWeight: "bold" }}>Total:</td>
                  <td style={{ fontWeight: "bold" }}>
                    ₹{cartData.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="tooltip-container">
              <button
                className={`${(cartData.length <= 0 || !tokenValue) ? 'disable' : 'checkout-button'}`}
                onClick={handlePayment}
                disabled={!tokenValue || cartData.length == 0}
              >
                Proceed to Checkout
              </button>
              {!tokenValue && (
                <div className="tooltip-message">
                  Please log in to proceed
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
