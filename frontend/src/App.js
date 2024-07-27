import React, { useContext, useEffect } from 'react';
import { AuthContext, AuthProvider } from './component/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom';
import NavigationBar from './component/NavigationBar'
import HomePage from './component/HomePage'

import './App.css';

function App() {
  const { user } = useContext(AuthContext);

  useEffect(()=>{
    if (user)
      console.log(user.username + " Connected")
  } , [user])
  //const user_1 = {'username' : 'daniel' , 'email' : 'daniel@n-k.org.il' , 'country' : 'usa' , 'birthday': Date.now()}

  return (
    <Router>
      <div className="App">
        <HomePage user={user}/>
        {user && (<NavigationBar user={user}/>)}
      </div>
    </Router>
  );
}

const AppWithProvider = () => (
  <AuthProvider>
    <App />
  </AuthProvider>
);

export default AppWithProvider;