import React, { useState } from 'react';
import axios from 'axios';
import './Setting.css'

const Setting = ({user}) => {
  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [oldPassword , setOldPassword] = useState('')
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(user.birthday);
  const [country, setCountry] = useState(user.country);
  const [error, setError] = useState(null);
  const [mode , setMode] = useState(true)

  const UpdateDetailsdSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdateDetailsdSubmit', { username, password }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  const UpdatePasswordSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', { username, password }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  

  return (
    <div className='setting-container'>
      <h1>Setting</h1>
      <div class='setting-mode-container'>
        <div class={`${mode? 'details' : ''}`} onClick={(e) => setMode(!mode)}>
            <label>{mode? 'Details' : 'Password'}</label>
        </div>
      </div>
        {mode? 
        (
            <form onSubmit={UpdateDetailsdSubmit}>
                <h3>Praivcy details</h3>
                <div className='setting-group-container'>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder='' required />
                    <label>Username</label>
                </div>
                <div className='setting-group-container'>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder='' required/>
                    <label>Email</label>
                </div>
                <div className={`setting-group-container named ${birthday !== null? 'filled': ''}`}>
                    <input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder='' required/>
                    <label>Birthday</label>
                </div>
                <div className={`setting-group-container named ${country !== 'none'? 'filled': ''}`}>
                    <select value={country} onChange={(e)=>{setCountry(e.target.value)}}>
                    <option value="none" disabled hidden>Select a country</option>
                    <option value="israel">Israel</option>
                    <option value="usa">usa</option>
                    <option value="italy">italy</option>
                    </select>
                    <label>Country</label>
                </div>
                <button className='setting-button' type="submit">Update</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        )
        : 
        (   
            <form onSubmit={UpdatePasswordSubmit}>
                <h3>Update Your Password</h3>
                <div className='setting-group-container'>
                    <input type="password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value.trim())} placeholder='' required/>
                    <label>Old Password</label>
                </div>
                <div className='setting-group-container'>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} placeholder='' required/>
                    <label>Password</label>
                </div>
                <div className='setting-group-container'>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value.trim())} placeholder='' required/>
                    <label>Confirm Password</label>
                </div>
                <button className='setting-button' type="submit">Update</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
          </form>
        )}
    </div>
  );
};

export default Setting;