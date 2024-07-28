import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Registertion.css'

const Registertion = () => {


  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState(null);
  const [country, setCountry] = useState('none');
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const validation = () => {
    let isValid = true; // Initialize as true
  
    if (username.length < 1 || username.length > 10 || !/[a-zA-Z]/.test(username)) {
      setError("Username must be between 1 and 10 characters and contain at least one letter.");
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#!$%^])[A-Za-z\d#!$%^]{1,10}$/.test(password)) {
      setError('Password must be 1-10 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (# !$ % ^).');
      isValid = false;
    } else if (password !== confirmPassword) {
      setError("Passwords do not match.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format.");
      isValid = false;
    } else if (new Date(birthday) >= new Date()) {
      setError("Birthday must be a date in the past.");
      isValid = false;
    } else if (country === 'none') {
      setError('Please select a country.');
      isValid = false;
    }
  
    return isValid;
  };


  const handelRegister = async (event) => {
    event.preventDefault();
    try {
      if (validation()){
        await axios.post('http://localhost:5000/registertion', { username, password , email , birthday , country }, { withCredentials: true });
        setError(null);
        navigate('/Login');
      }
    } 
    catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 500)){
        setError(error.response.data);
      }
      else{
        setError('An unexpected error occurred. Please try again later.');
      }
    }
  };

  return (
    <div className='registertion-container'>
      <h1>Registertion</h1>
      <form onSubmit={handelRegister}>
        <div className='registertion-group-container'>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder=''  />
          <label>Username</label>
        </div>
        <div className='registertion-group-container'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} placeholder=''/>
          <label>Password</label>
        </div>
        <div className='registertion-group-container'>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value.trim())} placeholder=''/>
          <label>Confirm Password</label>
        </div>
        <div className='registertion-group-container'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder='' />
          <label>Email</label>
        </div>
        <div className={`registertion-group-container named ${birthday !== null? 'filled': ''}`}>
          <input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder='' />
          <label>Birthday</label>
        </div>
        <div className={`registertion-group-container named ${country !== 'none'? 'filled': ''}`}>
          <select value={country} onChange={(e)=>{setCountry(e.target.value)}}>
            <option value="none" disabled hidden>Select a country</option>
            <option value="israel">Israel</option>
            <option value="usa">usa</option>
            <option value="italy">italy</option>
          </select>
          <label>Country</label>
        </div>
        <button className='registertion-button' type="submit">Register</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Registertion;