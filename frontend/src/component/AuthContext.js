import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [search , setSearch] = useState('')


  const setCookie = (name, value, days) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + days);
    document.cookie = `${name}=${value}; expires=${expirationDate.toUTCString()}; path=/`;
  }
  //const getCookie = (name) => {
  //  const cookies = document.cookie.split("; ").find((row) => row.startsWith(`${name}=`));
  //  return cookies ? cookies.split("=")[1] : null;
  //}
  //const username = getCookie("username");

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await axios.post('http://localhost:5000/session', { withCredentials: true });
        setUser(response.data.user);
        //const username = getCookie("username");
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log(error.response.data);
          setUser(null);
        }
      }
    };

    checkSession();
  }, []);

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5000/login', { username, password }, { withCredentials: true });
      setUser(response.data.user);
      setCookie("username", user.username, 7);
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 500))   {
        throw new Error(error.response.data);
      } else {
        throw new Error('An unexpected error occurred. Please try again later.');
      }
    }
  };

  const logout = async () => {
    try {
      await axios.get('http://localhost:5000/logout', { withCredentials: true });
      console.log(user.username + " Disconnected")
      setUser(null);
    }
    catch (error) {
      throw new Error('Something goes Worng');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, setUser , setSearch , search}}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };