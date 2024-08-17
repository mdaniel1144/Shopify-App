import React, { useState } from 'react';
import axios from 'axios';
import './FormProducts.css'

const FormProducts = ({product , typeMethod , setIsItem}) => {

  
  const [serial, setSerial] = useState(product?.serial || '');
  const [name, setName] = useState(product?.name || '');
  const [price, setPrice] = useState(product?.price || 0);
  const [count, setCount] = useState(product?.count || 0);
  const [brand, setBrand] = useState(product?.brand || '');
  const [category, setCategory] = useState(product?.category || 'none');
  const [date, setDate] = useState(product?.date ? new Date(product.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState(product?.description || '');
  const [image, setImage] = useState(product?.image || '');
  const [error, setError] = useState(null);


  const validateForm = () => {
    let isValid = true
    if (brand.length < 1 || brand.length > 50) {
      setError("brand must be in range 1-50");
      isValid = false;
    } else if (isNaN(price) || price <= 0)  {
      setError("Price must be a positive number");
      isValid = false;
    } else if (isNaN(count) || count <= 0)  {
      setError("Count must be a positive number");
      isValid = false;
    } else if (serial.length < 1 || serial.length > 100) {
      setError("serial must be in range 1-150");
      isValid = false;
    } else if (name.length < 1 || name.length > 50) {
      setError("name must be in range 1-50");
      isValid = false;
    } else if (description.length < 1 || description.length > 150) {
      setError("Description must be in range 1-150");
      isValid = false;
    }  else if (new Date(date) >= new Date()) {
      setError("Date must be a date in the past.");
      isValid = false;
    } else if (category === 'none') {
      setError('Please select a category.');
      isValid = false;
    }
    
    return isValid;
  };

  
  const handelProductsSubmit = async (event) => {
    event.preventDefault();
    try {
      if(validateForm()){
        const jsonData = {
          serial,
          name,
          price,
          brand,
          date,
          count,
          description,
          category,
          image
        };

        product = jsonData
        
        if(typeMethod){
          const response = await axios.post('http://localhost:5000/products/insert', jsonData , { withCredentials: true ,
        headers: { 'Content-Type': 'application/json' }
        })}
        else
        {
          console.log(jsonData)
          const response = await axios.post('http://localhost:5000/products/update', jsonData , { withCredentials: true ,
            headers: { 'Content-Type': 'application/json' }
          });
        }
        setError(null); // Clear any previous error
        setIsItem(false)
      }
    } 
    catch (error) {
      console.log(error)
      setError(error.response?.data?.message || 'An error occurred');
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
       <form onSubmit={handelProductsSubmit}>
        <div className='formproducts-group-container'>
          <input type="text" value={serial} onChange={(e) => setSerial(e.target.ariaValueMax)} placeholder='' required/>
          <label>Serial</label>
        </div>
        <div className='formproducts-group-container'>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder='' required />
          <label>name</label>
        </div>
        <div className='formproducts-group-container'>
          <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} placeholder='' required/>
          <label>Price</label>
        </div>
        <div className='formproducts-group-container'>
          <input type="number" value={count} onChange={(e) => setCount(e.target.value)} placeholder='' required/>
          <label>Count</label>
        </div>
        <div className='formproducts-group-container'>
          <input type='text' value={description} onChange={(e) => setDescription(e.target.value)} placeholder='' required/>
          <label>Description</label>
        </div>
        <div className='formproducts-group-container'>
          <input type='text' value={brand} onChange={(e) => setBrand(e.target.value)} placeholder='' required/>
          <label>Brand</label>
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
      <button className='formproducts-button' type="submit">{product? 'Update' : 'Save'}</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>

    <div className='formproducts-profile-container'>
        <div className='formproducts-profile-image'>
            {image ? (<img className='formproducts-image' src={image}/>) : (<label>No Found Image</label>)}
        </div>
        <div className='formproducts-profile-details'>
            <label><b>Serial Number: </b>{serial}</label>
            <label><b>Name: </b>{name}</label>
            <label><b>Category: </b>{category}e</label>
            <label><b>Price: </b>{price}</label>
            <label><b>Count: </b>{count}</label>
            <label><b>Brand: </b>{brand}</label>
            <label><b>Description: </b>{description}</label>
        </div>
    </div>
    </div>
  );
};

export default FormProducts;