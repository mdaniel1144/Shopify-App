import React, { useState } from 'react';
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/Registertion', { username, password }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div className='registertion-container'>
      <h1>Registertion</h1>
      <form onSubmit={handleSubmit}>
        <div className='registertion-group-container'>
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder='' required />
          <label>Username</label>
        </div>
        <div className='registertion-group-container'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} placeholder='' required/>
          <label>Password</label>
        </div>
        <div className='registertion-group-container'>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value.trim())} placeholder='' required/>
          <label>Confirm Password</label>
        </div>
        <div className='registertion-group-container'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder='' required/>
          <label>Email</label>
        </div>
        <div className={`registertion-group-container named ${birthday !== null? 'filled': ''}`}>
          <input type='date' value={birthday} onChange={(e) => setBirthday(e.target.value)} placeholder='' required/>
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
        <button className='registertion-button' type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Registertion;