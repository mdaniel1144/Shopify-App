import React , { useState }from 'react';
import './Item.css'

const Item = ({item}) => {

    const [count, setCount] = useState(0);


    const handleChange = (num) => {
        if(count + num >=0 && count + num <= 10)
            setCount(count+num)
    };

  return (
    <div className='Item-container'>
        <div className='Item-image-container'>
            <img src={item.image? item.image :'./images/logo.png'} />
        </div>
        <div className='Item-details-container'>
            <table>
                <tr>
                    <td><label>Name</label></td>
                    <td>{item.name}</td>
                </tr>
                <tr>
                    <td><label>price</label></td>
                    <td>{item.price}</td>
                </tr>
                <tr>
                    <td><label>brand</label></td>
                    <td>{item.brand}</td>
                </tr>
                <tr>
                    <td colSpan={2}>
                        <button className='Item-button' onClick={(e)=>handleChange(1)}>+</button>
                        <label className='Item-sum'>{count}</label>
                        <button className='Item-button' onClick={(e)=>handleChange(-1)}>-</button>
                        <button id="Item-cart-add" className='Item-button'>Add</button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
  );
};

export default Item;


