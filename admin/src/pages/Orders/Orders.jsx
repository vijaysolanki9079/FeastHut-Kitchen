import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Orders.css"; // make sure the CSS file exists

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);

  // Fetch all orders for admin
  const fetchOrders = async () => {
    try {
      const res = await axios.get(`${url}/api/order/list`); // listOrders route

      if (res.data.success) {
        setOrders(res.data.orders);
      } else {
        toast.error("Failed to fetch orders!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching orders!");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  return (
    <div className="orders-page">
      <h2>All Orders</h2>

      {orders.length === 0 ? (
        <p>No orders found!</p>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>User</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Items</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.userId?.name || "N/A"}</td>
                <td>{order.amount} $</td>

                {/* Status Badge */}
                <td>
                  <span
                    className={`status-badge ${
                      order.status === "Food Processing"
                        ? "status-processing"
                        : order.status === "Order Confirmed"
                        ? "status-confirmed"
                        : order.status === "Delivered"
                        ? "status-delivered"
                        : order.status === "Cancelled"
                        ? "status-cancelled"
                        : ""
                    }`}
                  >
                    {order.status}
                  </span>
                </td>

                {/* Payment Badge */}
                <td>
                  <span
                    className={`payment-badge ${
                      order.payment ? "payment-paid" : "payment-pending"
                    }`}
                  >
                    {order.payment ? "Paid" : "Pending"}
                  </span>
                </td>
 
 
                {/* Items */}
                <td>
                  {order.items.map((item) => (
                    <div key={item._id}>
                      {item.name} x {item.quantity}
                    </div>
                  ))}
                </td>
                
                <td>
                  {new Date(order.date).toLocaleDateString()} {new Date(order.date).toLocaleTimeString()}
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
