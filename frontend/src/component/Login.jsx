import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';
import './Login.css'

const Login = () => {

  const {login} = useContext(AuthContext)

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  //const { setUser } = useContext(AuthContext);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await login(username , password)
      setError(null); // Clear any previous error
    } catch (error) {
      console.log(error)
      setError(error.message || 'An unexpected error occurred');
    }
  };

  return (
    <div className='login-container'>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div className='login-group-container'>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className='login-group-container'>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className='login-button' type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;