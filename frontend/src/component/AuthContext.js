import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/session', { withCredentials: true });
        setUser(response.data.user);
      } catch (error) {
        setUser(null);
      }
    };

    checkSession();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });
      setUser(response.data.user);
      return response.data;
    } catch (error) {
      throw new Error('Invalid username or password');
    }
  };

  const logout = async () => {
    await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };