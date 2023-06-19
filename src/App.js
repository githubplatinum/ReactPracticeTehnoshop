import React, { useState } from 'react';
import './App.css';

function ProductForm({ addForm }) {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [isActive, setIsActive] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!productName || !productPrice || !category || !quantity || !isActive) return;
    addForm({ productName, productPrice, category, quantity, isActive });
    setProductName('');
    setProductPrice('');
    setCategory('');
    setQuantity('');
    setIsActive('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <label>Enter Product Name</label>
      <input
        type="text"
        className="input"
        value={productName}
        onChange={e => setProductName(e.target.value)}
      />

      <label>Enter Product Price</label>
      <input
        type="text"
        className="input"
        value={productPrice}
        onChange={e => setProductPrice(e.target.value)}
      />

      <label>Enter Category</label>
      <input
        type="text"
        className="input"
        value={category}
        onChange={e => setCategory(e.target.value)}
      />

      <label>Enter Quantity</label>
      <input
        type="text"
        className="input"
        value={quantity}
        onChange={e => setQuantity(e.target.value)}
      />

      <label>IsActive</label>
      <input
        type="text"
        className="input"
        value={isActive}
        onChange={e => setIsActive(e.target.value)}
      />

      <button type="submit">Submit</button>
    </form>
  );
}

function ProductList({ formDataList, deleteForm }) {
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
            <th>Actions</th>
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
                <button onClick={() => deleteForm(index)}>Delete</button>
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

  const addForm = formData => {
    setFormDataList([...formDataList, formData]);
  };

  const deleteForm = index => {
    const updateList =[...formDataList];
    updateList.splice(index,1);
    setFormDataList(updateList);
  };
  return (
    <div className="main">
      <h2>Enter Product Details</h2>
      <ProductForm addForm={addForm} />
      <h3>Product List</h3>
      <ProductList formDataList={formDataList} deleteForm={deleteForm} />
    </div>
  );
}

export default App;
