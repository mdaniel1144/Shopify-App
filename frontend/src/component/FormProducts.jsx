import React, { useState } from 'react';
import axios from 'axios';
import './FormProducts.css'

const FormProducts = ({product}) => {

    if (product === null)
        product = {'serial' : '' , 'name' : '' , 'price' : '' ,'date': Date.now() ,'description':'' ,'category': 'none'}
    
  const [serial, setSerial] = useState(product.serial);
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [category, setCategory] = useState(product.category);
  const [date, setDate] = useState(new Date(product.date).toISOString().split('T')[0]);
  const [description, setDescription] = useState(product.description);
  const [image, setImage] = useState(product.image);

  const [error, setError] = useState(null);

  
  const UpdateProductsSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', {  }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please upload a valid image file.');
    }
  };

  return (
    <div className='formproducts-container'>
        <h3>Update your Product</h3>
       <form onSubmit={UpdateProductsSubmit}>
        <div className='formproducts-group-container'>
          <input type="text" value={serial} onChange={(e) => setSerial(e.target.value.trim())} placeholder='' required/>
          <label>Serial</label>
        </div>
        <div className='formproducts-group-container'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value.trim())} placeholder='' required />
          <label>name</label>
        </div>
        <div className='formproducts-group-container'>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value.trim())} placeholder='' required/>
          <label>Price</label>
        </div>
        <div className='formproducts-group-container'>
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value.trim())} placeholder='' required/>
          <label>description</label>
        </div>
        <div className={`formproducts-group-container named ${date ? 'filled': ''}`}>
          <input type='date' value={date.toString().split('T')[0]} onChange={(e) => setDate(e.target.value)} placeholder='' required/>
          <label>Date</label>
        </div>
        <div className={`formuser-group-container named ${category !== 'none'? 'filled': ''}`}>
          <select value={category} onChange={(e)=>{setCategory(e.target.value)}}>
          <option value="none" disabled hidden>Select a category</option>
          <option value="computer">Computers</option>
          <option value="tv">Tvs</option>
          <option value="smartphone">SmartPhone</option>
          </select>
          <label>Category</label>
      </div>
        <div className='formproducts-group-container'>
          <input type='file' accept="image/*" onChange={handleFileChange} />
          <label>image</label>
        </div>
      <button className='formproducts-button' type="submit">Update</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    <div className='formproducts-profile-container'>
        <div className='formproducts-profile-image'>
            {image ? (<img className='formproducts-image' src={image}/>) : (<label>No Found Image</label>)}
        </div>
        <div className='formproducts-profile-details'>
            <label>Serial Number: {serial}</label>
            <label>Name: {name}</label>
            <label>Category: {category}e</label>
            <label>Price: {price}</label>
            <label>Description: {description}</label>
        </div>
    </div>
    </div>
  );
};

export default FormProducts;