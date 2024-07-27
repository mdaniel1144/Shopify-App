import React, { useState } from 'react';
import axios from 'axios';
import './Page404.css'

const Page404 = () => {

  return (
    <div className='page404-container'>
      <main class="main">
        <h1>4</h1>
        <h1 class="X">
          <span class="caution__tape text"></span>
          <span class="caution__tape text"></span>
        </h1>
        <h1>4</h1>
      </main>
      <section class="background">  
        <div id="caution__tape__left" class="caution__tape left">
          <p class="ERROR">ERROR</p>
        </div>
        <div id="caution__tape__center" class="caution__tape center">
          <p class="PAGE_NOT_FOUND">PAGE NOT FOUND!</p>
        </div>
      </section>
    </div>
  );
};

export default Page404;