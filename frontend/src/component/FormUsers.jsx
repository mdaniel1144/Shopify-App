import React, { useState } from 'react';
import axios from 'axios';
import './FormUsers.css'

const FormUsers = ({user}) => {

  if (user === null)
    user = {'username' : '' , 'email' : '' , 'country' : 'none' , 'birthday': null ,'isActive' : true , 'isAdmin' : false}

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState(user.email);
  const [birthday, setBirthday] = useState(new Date(user.birthday).toISOString().split('T')[0]);
  const [country, setCountry] = useState(user.country);
  const [isActive, setIsActive] = useState(user.isActive);
  const [isAdmin, setIsAdmin] = useState(user.isAdmin);
  const [error, setError] = useState(null);

  
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
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value.trim())} placeholder='' required />
          <label>Username</label>
        </div>
        <div className='formuser-group-container'>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value.trim())} placeholder='' required/>
          <label>Email</label>
        </div>
        <div className={`formuser-group-container named ${birthday ? 'filled': ''}`}>
          <input type='date' value={birthday.toString().split('T')[0]} onChange={(e) => setBirthday(e.target.value)} placeholder='' required/>
          <label>Birthday</label>
        </div>
        <div className='formuser-group-container'>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value.trim())} placeholder='' required/>
          <label>Password</label>
        </div>
        <div className='formuser-group-container'>
          <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value.trim())} placeholder='' required/>
          <label>Confirm Password</label>
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