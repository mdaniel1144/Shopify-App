import React, { useState, useContext } from 'react';
import { AuthContext } from './component/AuthContext';
import { FaSearch ,FaShoppingCart } from 'react-icons/fa';
import {Route, Routes } from 'react-router-dom';
import { Link } from 'react-router-dom'
import Logo  from './Logo';
import ListItem from './ListItem'
import Login from './Login';
import Registertion from './Registertion'
import Setting from './Setting';
import Page404 from './Page404';
import AdvanceSetting from './AdvanceSetting'
import Cart from './Cart'
import './HomePage.css'

const HomePage = ({user}) => {
    const [isOpenSearch , setIsopenSearch] = useState(false)
    const [search , setSearch] = useState('')

  return (
    <div className='homepage-container'>
        <div className='navigation-top-container'>
            <div class="navigation-top-command">
            {!user && (<div><button>SignIn</button>
                <button>LogIn</button></div>)}
                <div className='homepage-cart-container'>
                ` <Link to="/Cart">
                    <button>
                      <FaShoppingCart />
                      <label id='counter-cart'>2</label>
                    </button>
                  </Link>
                </div>
            </div>
            <div class="navigation-top-title">
                <Logo />
            </div>
            <div class="navigation-top-search">
                <input className={`${isOpenSearch? 'open' : ''}`} onChange={(e)=>{setSearch(e.target.value.trim())}} type='text' placeholder="Type here.."></input>
                <button onClick={(e)=>setIsopenSearch(!isOpenSearch)}> <FaSearch /></button>
            </div>
        </div>
        <div className="App-content">
          <Routes>
            <Route path="/ListItem" element={<ListItem />}/>
            <Route path="/login" element={<Login />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/Registertion" element={<Registertion />} />
            <Route path="/Setting" element={<Setting  user={user}/>} />
            <Route path="/AdvanceSetting" element={<AdvanceSetting  user={user}/>} />
            <Route path="*" element={<Page404/>} />
          </Routes>
        </div>
    </div>

  );
};

export default HomePage;