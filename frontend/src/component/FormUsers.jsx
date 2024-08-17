import React, { useState } from 'react';
import axios from 'axios';
import './FormUsers.css'

const FormUsers = ({user , typeMethod , setIsItem}) => {


  const [username, setUsername] = useState(user?.username || '');
  const [password, setPassword] = useState(user?.password  || '');
  const [email, setEmail] = useState(user?.email || '');
  const [birthday, setBirthday] = useState(user?.birthday ? new Date(user.birthday).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]);
  const [country, setCountry] = useState(user?.country || 'none');
  const [isActive, setIsActive] = useState(user?.isActive || true);
  const [isAdmin, setIsAdmin] = useState(user?.isAdmin || false);
  const [error, setError] = useState(null);

  const validateForm = () => {
    let isValid = true; // Initialize as true
  
    if (username.length < 1 || username.length > 10 || !/[a-zA-Z]/.test(username)) {
      setError("Username must be between 1 and 10 characters and contain at least one letter.");
      isValid = false;
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#!$%^])[A-Za-z\d#!$%^]{1,10}$/.test(password)) {
      setError('Password must be 1-10 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character (# !$ % ^).');
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


  const handelUserSubmit = async (event) => {
    event.preventDefault();
    try {
      if(validateForm()){
        const jsonData = {
          username,
          email,
          password,
          birthday,
          country,
          isActive,
          isAdmin
        };

        user = jsonData
        
        if(typeMethod){
          const response = await axios.post('http://localhost:5000/users/insert', jsonData , { withCredentials: true ,
        headers: { 'Content-Type': 'application/json' }
        })}
        else
        {
          console.log(jsonData)
          const response = await axios.post('http://localhost:5000/users/update', jsonData , { withCredentials: true ,
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

  
  const UpdateUsersSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', {  }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='formuser-container'>
       <form onSubmit={UpdateUsersSubmit}>
        <h3>Update your Users</h3>
        <div className='formuser-group-container'>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder='' required />
          <label>Username</label>
        </div>
        <div className='formuser-group-container'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='' required/>
          <label>Email</label>
        </div>
        <div className={`formuser-group-container named ${birthday ? 'filled': ''}`}>
          <input type='date' value={birthday.toString().split('T')[0]} onChange={(e) => setBirthday(e.target.value)} placeholder='' required/>
          <label>Birthday</label>
        </div>
        <div className='formuser-group-container'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='' required/>
          <label>Password</label>
        </div>
        <div className={`formuser-group-container named ${country !== 'none'? 'filled': ''}`}>
          <select value={country} onChange={(e)=>{setCountry(e.target.value)}}>
          <option value="none" disabled hidden>Select a country</option>
          <option value="israel">Israel</option>
          <option value="usa">usa</option>
          <option value="italy">italy</option>
          </select>
          <label>Country</label>
      </div>
      <div className={`formuser-group-container checked ${isActive === true? 'filled': ''}`}>
          <input type="checkbox" checked={isActive} onChange={(e) => setIsActive(!isActive)} required/>
          <label>Is Active</label>
      </div>
      <div className={`formuser-group-container checked ${isAdmin === true? 'filled': ''}`}>
        <input type='checkbox' checked={isAdmin} onChange={(e) => setIsAdmin(!isAdmin)} required/>
        <label>Is Admin</label>
      </div>
      <button className='formuser-button' type="submit">Update</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </div>
  );
};

export default FormUsers;