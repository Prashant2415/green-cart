import React, { useEffect, useState } from 'react';
import { orderBilling } from '../../utils/orderUtils';
import "../styles/styles.css";

const Order = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [activeIndex, setActiveIndex] = useState(null);
  const userDetail = JSON.parse(localStorage.getItem('userDetail'));
  const userId = userDetail?.data?._id;

  useEffect(() => {
    const fetchBilling = async () => {
      try {
        const res = await orderBilling(userId);
        setOrderDetails(res.data.data);
      } catch (err) {
        console.error("Error fetching order:", err);
      }
    };
    fetchBilling();
  }, [userId]);

  const toggleAccordion = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="page page-section">
      <h2 style={{ padding: "0rem 7rem" }}>My Orders</h2>
      {orderDetails.length === 0 ? (
        <div className="order-empty-div">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="accordion-container">
          {orderDetails.map((order, index) => (
            <div className="accordion-outer" key={index}>
              <button className="order-button" onClick={() => toggleAccordion(index)}>
                <h3>Order ID: {order._id}</h3>
              </button>
              <div className="accordion-content">
                <p className='accordion-para'><strong className='strong'>Customer:</strong> {order.userId?.name}</p>
                <p className='accordion-para'><strong className='strong'>Payment:</strong> {order.paymentStatus}</p>
                <p className='accordion-para'><strong className='strong'>Date:</strong> {new Date(order.billingDate).toLocaleString()}</p>
              </div>

              {activeIndex === index && (
                <table className="order-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {order.cartId?.products?.map((item) => (
                      <tr key={item._id}>
                        <td>
                          <img
                            src={item.productId.imageURL}
                            alt={item.productId.name}
                            width={50}
                            height={50}
                          />
                        </td>
                        <td>{item.productId.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.productId.price}</td>
                        <td>₹{item.quantity * item.productId.price}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'right', fontWeight: 'bold' }}>Total:</td>
                      <td style={{ fontWeight: 'bold' }}>₹{order.totalAmount}</td>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
