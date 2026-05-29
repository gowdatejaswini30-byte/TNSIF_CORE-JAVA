import React, { useState } from "react";
import "./App.css";

function App() {
  const [items, setItems] = useState([]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [editId, setEditId] = useState(null);

  const addOrUpdateItem = () => {
    if (!productName || !price || !quantity) return;

    if (editId !== null) {
      setItems(
        items.map((item) =>
          item.id === editId
            ? { ...item, productName, price, quantity }
            : item
        )
      );
      setEditId(null);
    } else {
      const newItem = {
        id: Date.now(),
        productName,
        price,
        quantity,
      };
      setItems([...items, newItem]);
    }

    setProductName("");
    setPrice("");
    setQuantity("");
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const editItem = (item) => {
    setEditId(item.id);
    setProductName(item.productName);
    setPrice(item.price);
    setQuantity(item.quantity);
  };

  return (
    <div className="container">
      <h1>Cart Management System</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <br /><br />

      <input
        type="number"
        placeholder="Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />
      <br /><br />

      <button className="add-btn" onClick={addOrUpdateItem}>
        {editId !== null ? "Update" : "Add"}
      </button>

      <h2>Cart Items</h2>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Product Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.productName}</td>
              <td>{item.price}</td>
              <td>{item.quantity}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => editItem(item)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;