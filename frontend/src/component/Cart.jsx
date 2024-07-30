import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { FaTimes, FaArrowLeft} from 'react-icons/fa';
import { useCart } from './CartContext';
import './Cart.css'

const Cart = ({}) => {

    const {cart , changeItem , removeItem} = useCart()
    const [tax , setTax] = useState(0.17)
    const [error, setError] = useState(null);


    const handleChangeCountItem = (item, num) => {
        const newCount = item.count + num;
        if (newCount >= 0 && newCount <= 10 && newCount <= item.product.count) {
          changeItem(item.product._id, newCount);
        }
    };

    const handleRemoveItem = (item) => {
        // Add a class to the row with the given index
        //const element = document.querySelector(`.modelitem-container[data-index="${item.product.serial}"]`);
        //console.log(element)
        //if (element) {
        //    element.classList.add('cart-removeItem');
        //    setTimeout(() => {
                removeItem(item.product._id);
        //    }, 8000); // Wait for the highlight to be visible before removing
       // }
    };


    const handelPay = async (event) => {
    event.preventDefault();
        try {
        const response = await axios.post('http://localhost:5000/Payment', {cart}, { withCredentials: true });
        setError(null); // Clear any previous error
        }   catch (error) {
        setError('Payment Not Succses');
        }
    };

    useEffect(()=>{console.log(cart)},[cart])
  
    return (
        <div className='cart-container'>
            <div className='cart-model-container'>
                <h1>Payment</h1>
                <ul>
                    <li><label>Price: </label>{cart.totalPrice}</li>
                    <li><label>Tax: </label>{(cart.totalPrice*tax).toFixed(2)}</li>
                    <li><label>Total Price: </label>{(cart.totalPrice*tax + cart.totalPrice).toFixed(2)}</li>
                </ul>
                <button class='cart-payment' onClick={(e)=>handelPay()}>Pay Now</button>
            </div>
            <table>
                <thead>
                    <h1>Your Cart</h1>
                </thead>
                <tbody className='modellist-group-container'>
                    <tr>
                        <th colSpan={3}>Item</th>
                        <th>Total Price</th>
                    </tr>
                        {cart.items.map((item , index) => (
                        <tr key={index} data-index={item.product.serial} className='modelitem-container'>
                        <td>
                            <img src={item.product.image}/>
                        </td>
                        <td width='200px'>
                                <span>
                                    <label>Name: {item.product.name}</label>
                                    <label>Price: {item.product.price}$</label>
                                </span>
                        </td>
                        <td  width='50%'>
                            <button className='Item-button' onClick={(e)=>handleChangeCountItem(item,1)}>+</button>
                            <label className='Item-sum'>{item.count}</label>
                            <button className='Item-button' onClick={(e)=>handleChangeCountItem(item,-1)}>-</button>
                        </td>
                        <td>
                            <label>{(item.product.price * item.count).toFixed(2)}$</label>
                        </td>
                        <FaTimes className='cart-delete-button' onClick={(e)=>{handleRemoveItem(item)}}/>
                        </tr>))
                        }
                </tbody>
            </table>
        </div>
    );
};

export default Cart;