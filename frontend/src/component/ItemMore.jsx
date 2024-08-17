import React, { useState, useEffect } from 'react';
import { useCart } from './CartContext';
import './ItemMore.css';

const ItemMore = ({ item }) => {
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
        <div className='itemMore-container'>
            <div className='itemMore-profile-image'>
                {item.image ? (<img className='itemMore-image' src={item.image}/>) : (<label>No Found Image</label>)}
            </div>
            <div className='itemMore-profile-details'>
                <label><b>Serial Number: </b>{item.serial}</label>
                <label><b>Name: </b>{item.name}</label>
                <label><b>Category: </b>{item.category}e</label>
                <label><b>Price: </b>{item.price}</label>
                <label><b>Count: </b>{item.count}</label>
                <label><b>Brand: </b>{item.brand}</label>
                <label><b>Description: </b>{item.description}</label>
            </div>
            {item.count > 0 && ( <div>
                <button className='itemMore-button' onClick={() => handleChange(1)}>+</button>
                <label className='itemMore-sum'>{count}</label>
                <button className='itemMore-button' onClick={() => handleChange(-1)}>-</button>
                {isAdded ?
                    (<button id="itemMore-cart-added" className='itemMore-button' onClick={handleRemoveItems}>Added</button>) :
                    (<button id="itemMore-cart-add" className='itemMore-button' onClick={handleInsertItems}>Add</button>)
                }
            </div>)}
        </div>
    );
};

export default ItemMore;