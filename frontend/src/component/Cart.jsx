import React, { useState , useEffect , useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes} from 'react-icons/fa';
import { AuthContext} from './AuthContext';
import { useCart } from './CartContext';
import Payment from './Payment'
import './Cart.css'

const Cart = () => {

    const { user } = useContext(AuthContext)
    const [isPayment , setIsPayment] = useState(false)
    const {cart , changeItem , removeItem } = useCart()
    const [tax] = useState(0.17)
    
    const handleChangeCountItem = (item, num) => {
        const newCount = item.count + num;
        if (newCount >= 0 && newCount <= 10 && newCount <= item.product.count) {
          changeItem(item.product._id, newCount);
        }
    };

    const handleRemoveItem = (item) => {
        // Add a class to the row with the given index
        const removeItemId = item.product._id
        const element = document.querySelector(`.modelitem-container[data-index="${removeItemId}"]`);
        //console.log(element)
        if (element) {
          element.classList.add('cart-removeItem');
            element.style.backgroundColor = 'lightblue';
        setTimeout(() => {
            removeItem(removeItemId);
        }, 350); // Wait for the highlight to be visible before removing
        }
    };


    useEffect(()=>{console.log(cart)},[cart])
  
    return (
        <section>
            {isPayment && (<Payment setIsPayment={setIsPayment}/>)}
        <div className='cart-container'>
            <div className='cart-model-container'>
                <h1>Payment</h1>
                <ul>
                    <li><label>Price: </label>{cart.totalPrice}</li>
                    <li><label>Tax: </label>{(cart.totalPrice*tax).toFixed(2)}</li>
                    <li><label>Total Price: </label>{(cart.totalPrice*tax + cart.totalPrice).toFixed(2)}</li>
                </ul>
                <button class='cart-payment' onClick={(e)=>setIsPayment(true)}>Pay Now</button>
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
                        <tr key={index} data-index={item.product._id} className='modelitem-container'>
                        <td>
                            <img src={item.product.image} alt=''/>
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
        </section>

    );
};

export default Cart;