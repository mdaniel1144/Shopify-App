import React from 'react';
import './Logo.css'

const Logo = ({user}) => {

  return (
    <div className='logo-container'>
        <img src='./images/logo.png'></img>
        <h1>Shopify</h1>
        <h5>only for you</h5>
    </div>
  );
};

export default Logo;


