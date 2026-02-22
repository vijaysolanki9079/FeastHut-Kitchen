import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const List = () => {
  const url = import.meta.env.VITE_API_URL;
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch items!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error fetching list!");
    }
  };

  const removeFood = async (id) => {
    // Show confirmation popup
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This food item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        const response = await axios.post(`${url}/api/food/remove`, { id });
        if (response.data.success) {
          toast.success("Food removed successfully!");
          setList((prevList) => prevList.filter((item) => item._id !== id));
          Swal.fire("Deleted!", "Your food item has been removed.", "success");
        } else {
          toast.error("Failed to remove food!");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error while deleting item!");
      }
    } else {
      toast.info("Deletion cancelled.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="list">
      <h2>Food Items</h2>

      {list.length === 0 ? (
        <p>No items found!</p>
      ) : (
        <table className="list-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {list.map((item) => (
              <tr key={item._id}>
                <td>
                  <img
                    src={`${url}/images/${item.image}`}
                    alt={item.name}
                    className="list-img"
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>₹{item.price}</td>
                <td>
                  <FaTimes
                    className="delete-icon"
                    onClick={() => removeFood(item._id)}
                    style={{
                      color: "red",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default List;
