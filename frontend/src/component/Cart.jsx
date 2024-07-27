import React, { useState , useEffect } from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import './Cart.css'

const Cart = ({}) => {

    
    const [cart, setCart] = useState([
        { product: { serial: 'xx3sx4', name: 'Iphone4', price: 4, date: Date.now(), 'image' : 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAApgAAAKYB3X3/OAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAANCSURBVEiJtZZPbBtFFMZ/M7ubXdtdb1xSFyeilBapySVU8h8OoFaooFSqiihIVIpQBKci6KEg9Q6H9kovIHoCIVQJJCKE1ENFjnAgcaSGC6rEnxBwA04Tx43t2FnvDAfjkNibxgHxnWb2e/u992bee7tCa00YFsffekFY+nUzFtjW0LrvjRXrCDIAaPLlW0nHL0SsZtVoaF98mLrx3pdhOqLtYPHChahZcYYO7KvPFxvRl5XPp1sN3adWiD1ZAqD6XYK1b/dvE5IWryTt2udLFedwc1+9kLp+vbbpoDh+6TklxBeAi9TL0taeWpdmZzQDry0AcO+jQ12RyohqqoYoo8RDwJrU+qXkjWtfi8Xxt58BdQuwQs9qC/afLwCw8tnQbqYAPsgxE1S6F3EAIXux2oQFKm0ihMsOF71dHYx+f3NND68ghCu1YIoePPQN1pGRABkJ6Bus96CutRZMydTl+TvuiRW1m3n0eDl0vRPcEysqdXn+jsQPsrHMquGeXEaY4Yk4wxWcY5V/9scqOMOVUFthatyTy8QyqwZ+kDURKoMWxNKr2EeqVKcTNOajqKoBgOE28U4tdQl5p5bwCw7BWquaZSzAPlwjlithJtp3pTImSqQRrb2Z8PHGigD4RZuNX6JYj6wj7O4TFLbCO/Mn/m8R+h6rYSUb3ekokRY6f/YukArN979jcW+V/S8g0eT/N3VN3kTqWbQ428m9/8k0P/1aIhF36PccEl6EhOcAUCrXKZXXWS3XKd2vc/TRBG9O5ELC17MmWubD2nKhUKZa26Ba2+D3P+4/MNCFwg59oWVeYhkzgN/JDR8deKBoD7Y+ljEjGZ0sosXVTvbc6RHirr2reNy1OXd6pJsQ+gqjk8VWFYmHrwBzW/n+uMPFiRwHB2I7ih8ciHFxIkd/3Omk5tCDV1t+2nNu5sxxpDFNx+huNhVT3/zMDz8usXC3ddaHBj1GHj/As08fwTS7Kt1HBTmyN29vdwAw+/wbwLVOJ3uAD1wi/dUH7Qei66PfyuRj4Ik9is+hglfbkbfR3cnZm7chlUWLdwmprtCohX4HUtlOcQjLYCu+fzGJH2QRKvP3UNz8bWk1qMxjGTOMThZ3kvgLI5AzFfo379UAAAAASUVORK5CYII=' , description: 'xxsx os sd', category: 'Tvs' }, count: 2 },
        { product: { serial: 'xx3sx4', name: 'Samsung', price: 4, date: Date.now(), 'image' : '' , description: 'xxsx os sd', category: 'Tvs' }, count: 2 },
        { product: { serial: 'xx3sx4', name: 'Iphone4', price: 10, date: Date.now(), 'image' : '', description: 'xxsx os sd', category: 'Tvs' }, count: 4 }
      ]);    const [allPrice , setAllPrice] = useState(0)
    const [tax , setTax] = useState(0.17)

    const [count, setCount] = useState(0);


    const handleChangeCountItem = (index,num) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart];
            const newCount = updatedCart[index].count + num;
            if (newCount >= 0 && newCount <= 10) {
              updatedCart[index].count = newCount;
            }
            return updatedCart;
        });
    };

    const [error, setError] = useState(null);

    const handelPay = async (event) => {
    event.preventDefault();
        try {
        const response = await axios.post('http://localhost:5000/api/UpdateDetailsdSubmit', { }, { withCredentials: true });
        setError(null); // Clear any previous error
        }   catch (error) {
        setError('Invalid username or password');
        }
    };

    useEffect(() => {
        const total = cart.reduce((sum, item) => {
        return sum + item.product.price * item.count;
        }, 0);
        setAllPrice(total);
    }, [cart]);

  
    return (
        <div className='cart-container'>
            <div className='cart-model-container'>
                <h1>Payment</h1>
                <ul>
                    <li><label>Price: </label>{allPrice}</li>
                    <li><label>Tax: </label>{(allPrice*tax).toFixed(2)}</li>
                    <li><label>Total Price: </label>{(allPrice*tax + allPrice).toFixed(2)}</li>
                </ul>
                <button>Pay Now</button>
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
                        {cart.map((item , index) => (
                        <tr key={index} className='modelitem-container'>
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
                            <button className='Item-button' onClick={(e)=>handleChangeCountItem(index,1)}>+</button>
                            <label className='Item-sum'>{item.count}</label>
                            <button className='Item-button' onClick={(e)=>handleChangeCountItem(index,-1)}>-</button>
                        </td>
                        <td>
                            <label>{(item.product.price * item.count).toFixed(2)}$</label>
                        </td>
                        </tr>))
                        }
                </tbody>
            </table>
        </div>
    );
};

export default Cart;