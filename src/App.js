import React, { useState, useEffect } from 'react';
import './App.css';

function ProductForm({ addForm, editIndex, formDataList, setEditIndex }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isActive, setIsActive] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!productName || !productPrice || !category || !quantity || !isActive) return;

    if (editIndex !== null) {
      const updatedList = [...formDataList];
      updatedList[editIndex] = { productName, productPrice, category, quantity, isActive };
      addForm(updatedList);
      setEditIndex(null);
    } else {
      addForm([...formDataList, { productName, productPrice, category, quantity, isActive }]);
    }

    setProductName('');
    setProductPrice('');
    setCategory('');
    setQuantity('');
    setIsActive('');
  };

  useEffect(() => {
    if (editIndex !== null) {
      const { productName, productPrice, category, quantity, isActive } = formDataList[editIndex];
      setProductName(productName);
      setProductPrice(productPrice);
      setCategory(category);
      setQuantity(quantity);
      setIsActive(isActive);
    }
  }, [editIndex, formDataList]);

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Enter Product Name</label>
      <input
        type="text"
        className="input"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
      />

      <label>Enter Product Price</label>
      <input
        type="text"
        className="input"
        value={productPrice}
        onChange={(e) => setProductPrice(e.target.value)}
      />

      <label>Enter Category</label>
      <input
        type="text"
        className="input"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <label>Enter Quantity</label>
      <input
        type="text"
        className="input"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      />

      <label>IsActive</label>
      <input
        type="text"
        className="input"
        value={isActive}
        onChange={(e) => setIsActive(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

function ProductList({ formDataList, deleteForm, editForm }) {
  return (
    <div className="form-data-list">
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>IsActive</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {formDataList.map((formData, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{formData.productName}</td>
              <td>{formData.productPrice}</td>
              <td>{formData.category}</td>
              <td>{formData.quantity}</td>
              <td>{formData.isActive}</td>
              <td>
                <button className="btn-action" onClick={() => deleteForm(index)}>
                  Delete
                </button>
                <button className="btn-action" onClick={() => editForm(index)}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [formDataList, setFormDataList] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const addForm = (formData) => {
    setFormDataList(formData);
  };

  const deleteForm = (index) => {
    const updatedList = [...formDataList];
    updatedList.splice(index, 1);
    setFormDataList(updatedList);
  };

  const editForm = (index) => {
    setEditIndex(index);
  };

  return (
    <div className="main">
      <h2>Enter Product Details</h2>
      <ProductForm addForm={addForm} editIndex={editIndex} formDataList={formDataList} setEditIndex={setEditIndex} />
      <h3>Product List</h3>
      <ProductList formDataList={formDataList} deleteForm={deleteForm} editForm={editForm} />
    </div>
  );
}

export default App;
