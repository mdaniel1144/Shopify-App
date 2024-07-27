import React, { useState } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import FormUsers from './FormUsers';
import FormProducts from './FormProducts';
import './AdvanceSetting.css'

const AdvanceSetting = ({user}) => {

  const users = [{'username' : 'daniel' , 'email' : 'daniel@n-k.org.il' , 'country' : 'usa' , 'birthday': Date.now() , 'isAdmin' : true} , {'username' : 'rotem' , 'email' : 'rotem@n-k.org.il' , 'country' : 'usa' , 'birthday': Date.now() , 'isAdmin' : false} , {'username' : 'moshe' , 'email' : 'moshe@n-k.org.il' , 'country' : 'israel' , 'birthday': Date.now() , 'isAdmin' : true}]
  const products = [{'serial' : 'xx3sx4' , 'name' : 'Iphone4' , 'price' : '4' ,'date': Date.now() ,'description':'xxsx os sd' ,'category': 'Tvs'} ]
  const sales = [{'category' : 'Tvs' , 'Sales' : '20%' }]


  const models = ['Product', 'Sale', 'User'];

  const [error, setError] = useState(null);
  const [modelSelected , setModelSelected] = useState(models[0])
  const [data , setData] = useState()
  const [isItem , setIsItem] = useState(false)

  const UpdateSalesSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdateDetailsdSubmit', { }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const UpdateProductSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', { }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  const GetStatics = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', { }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handelDeleteItem = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', { }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };
  
  return (
    <div className='advanceSetting-container'>
      <div className='advanceSetting-model-container'>
        <h1>Admin Setting</h1>
        <ul>
        {models.map((model) => (
          <li onClick={(e)=> {setModelSelected(model); setIsItem(false)}}>{model}</li>
        ))}
        </ul>
      </div>
      <table>
        <thead style={{display: 'block'}}>
          {isItem? 
            (<tr class='advanceSetting-command'>
                <th>
                  <button className='advanceSetting-button-back'  onClick={(e)=> setIsItem(false)}><FaArrowLeft style={{ marginRight: '15px' }}/>Back</button>
                  <button className='advanceSetting-button-update' onClick={handelDeleteItem}><FaTrash  style={{ marginRight: '15px' }} />Delete</button>
                </th>
            </tr>)
            : 
            (
              <tr class='advanceSetting-command'><th><button className='advanceSetting-button-update' onClick={(e)=> {setIsItem(true) ; setData(null)}}><FaPlus  style={{ marginRight: '15px' }}/>Create New</button></th></tr>)
            }
        </thead>
        <tbody>
          {modelSelected === 'Product' &&
          (
            <div className='modellist-group-container'>
              {isItem? (<FormProducts product={data}/> )
                :
                (
                  products.map((product , index) => (
                <tr key={index} className='modelitem-container' onClick={(e) => {setIsItem(!isItem); setData(product)}}>
                  <td><label>Serial: {product.serial} - {product.name}</label></td>
                </tr>))
                )}
            </div>)}
            {modelSelected === 'User' &&
            (
            <div className='modellist-container'>
              {isItem? (<FormUsers user={data}/> )
                :
                (
                users.map((user , index) => (
                <tr key={index} className='modelitem-container' onClick={(e) => {setIsItem(!isItem); setData(user)}}>
                  <td><label>{user.username} , {user.email}</label></td>
                </tr>))
                )}
            </div>)}
            {modelSelected === 'Sale' &&
            (
            <div className='modellist-container'>
              {isItem? (<FormUsers user={data}/> )
                :
                (
                sales.map((sale , index) => (
                <tr key={index} className='modelitem-container' onClick={(e) => {setIsItem(!isItem); setData(sale)}}>
                  <td><label>{sale.category} , {sale.Price}</label></td>
                </tr>))
                )}
            </div>)}
        </tbody>
      </table>
        {modelSelected === 'Sales' && 
        ( null)}  
    </div>
  );
};

export default AdvanceSetting;