import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import './Item.css';

const Item = ({ item }) => {
    const [isAdded, setIsAdded] = useState(false);
    const [count, setCount] = useState(0);
    const { addItem, removeItem, changeItem } = useCart();

    const handleChange = (num) => {
        setCount(prevCount => {
            const newCount = prevCount + num;
            if (newCount >= 0 && newCount <= 10 && newCount <= item.count) {
                changeItem(item._id, newCount);
                return newCount;
            }
            return prevCount;
        });
    };

    const handleRemoveItems = () => {
        setCount(0);
        removeItem(item._id);
        setIsAdded(false);
    };

    const handleInsertItems = () => {
        if (count === 0) {
            setCount(1);
        }
        addItem({ product: item, count: count === 0 ? 1 : count });
        setIsAdded(true);
    };

    // Update the state based on the props if necessary
    useEffect(() => {
        // Add logic to synchronize with context/cart state if needed
    }, [item]);

    return (
        <div className='Item-container'>
            <div className='Item-image-container'>
                <img src={item.image ? item.image : './images/logo.png'} alt={item.name} />
            </div>
            <div className='Item-details-container'>
                <table>
                    <tbody>
                        <tr>
                            <td><label>Name</label></td>
                            <td>{item.name}</td>
                        </tr>
                        <tr>
                            <td><label>Price</label></td>
                            <td>{item.price}</td>
                        </tr>
                        <tr>
                            <td><label>Brand</label></td>
                            <td>{item.brand}</td>
                        </tr>
                        <tr>
                            <td colSpan={2}>
                                <button className='Item-button' onClick={() => handleChange(1)}>+</button>
                                <label className='Item-sum'>{count}</label>
                                <button className='Item-button' onClick={() => handleChange(-1)}>-</button>
                                {isAdded ?
                                    (<button id="Item-cart-added" className='Item-button' onClick={handleRemoveItems}>Added</button>) :
                                    (<button id="Item-cart-add" className='Item-button' onClick={handleInsertItems}>Add</button>)
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Item;