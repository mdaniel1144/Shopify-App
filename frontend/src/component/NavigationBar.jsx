import React, { useState } from 'react';
import './NavigationBar.css'
import { FaChevronRight, FaTimes , FaTags, FaCog , FaSlidersH } from 'react-icons/fa'; // Import icons from react-icons
import { Link } from 'react-router-dom'
import Logo from './Logo';


const NavigationBar = ({user}) => {

  const [isOpenNavigitonBar , setIsNavigitonBar] = useState(false)

  return (
    <div className={`navigation-container ${isOpenNavigitonBar? 'open' : ''}`}>
      <div className='navigation-content-container'>
        <div className='navigation-logo-container'>
          <Logo />
        </div>
       <div className='navigation-user-container'>
          {user? 
          (<h2>Welcome, {user.username}</h2>)
         :
          (null)
          }
         
        </div>
        <div className='navigation-group-container'>
          <ul className='navigation-menu-container'>
            <li>
              <Link to="/ListItem"> 
                <FaTags className='navigation-menu-icon'/>
                <label>Make Shoping</label>
              </Link>
            </li>
            <li>
              <Link to="/Sales" >
              <FaCog className='navigation-menu-icon'/>
              <label>My sales</label>
              </Link>
            </li>           
             <li>
             <Link to="/Setting" >
                <FaCog className='navigation-menu-icon'/>
                <label>Setting</label>
              </Link>
            </li>
            {user && user.isAdmin?
              (<li>
                <Link to="/AdvanceSetting" >
                  <FaSlidersH className='navigation-menu-icon'/>
                  <label>Advance Setting</label>
                </Link>
              </li>)
            :
              (null)
            } 
          </ul>
        </div>
        <div className='navigation-group-container'> 
        </div>
      </div>
      <div className='navigation-group-container' style={{ verticalAlign: 'top' , top: '20px'}}>
          <button className='navigation-buttom' type='button' onClick={(e) => setIsNavigitonBar(!isOpenNavigitonBar)}>
          {isOpenNavigitonBar ? <FaTimes /> : <FaChevronRight />} {/* Toggle icon */}
          </button>
      </div>
      {isOpenNavigitonBar? (<div className='navigation-close' onClick={(e) => setIsNavigitonBar(!isOpenNavigitonBar)}></div>) : (null)}
    </div>
  );
};

export default NavigationBar;