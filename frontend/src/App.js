import React, { useContext } from 'react';
import {AuthProvider } from './component/AuthContext';
import {BrowserRouter as Router} from 'react-router-dom';
import NavigationBar from './component/NavigationBar'
import HomePage from './component/HomePage'

import './App.css';

function App() {useContext

  const { user } = useContext(AuthContext);

  //const user_1 = {'username' : 'daniel' , 'email' : 'daniel@n-k.org.il' , 'country' : 'usa' , 'birthday': Date.now() , 'isAdmin' : true}

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