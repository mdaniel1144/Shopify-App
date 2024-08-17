import React, { useState, useContext } from 'react';
import { AuthContext } from './AuthContext';
import { useCart } from './CartContext';
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

  const {cart} = useCart()
  const {logout , setSearch } = useContext(AuthContext)
  const [isOpenSearch , setIsopenSearch] = useState(false)


  return (
    <div className='homepage-container'>
        <div className='navigation-top-container'>
            <div class="navigation-top-command">
              {user? 
                (<button onClick={logout}>LogOut</button>)
              : (
                <div style={{display : 'inline-block'}}>
                  <Link to="/Login"><button>LogIn</button></Link>
                  <Link to="/Registertion"><button>SignIn</button></Link>
                </div>)
              }
              {cart.items.length > 0 && (
                <div className='homepage-cart-container'>
                  <Link to="/Cart">
                    <button>
                      <FaShoppingCart />
                      <label id='counter-cart'>{cart.totalItems}</label>
                    </button>
                  </Link>
                </div>)}
            </div>
            <div class="navigation-top-title">
                <Logo />
            </div>
            <div class="navigation-top-search">
                <span>Search</span>
                <input className={`${isOpenSearch? 'open' : ''}`} onChange={(e)=>{setSearch(e.target.value.trim())}} type='text' placeholder="Type here.."></input>
                <button onClick={(e)=>setIsopenSearch(!isOpenSearch)}> <FaSearch /></button>
            </div>
        </div>
        <div className="App-content">
          <Routes>
            <Route path="/" element={<ListItem />}/>
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