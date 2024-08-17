import React, { createContext, useReducer, useContext , useEffect } from 'react';

const initCart = {
    items: [],          // Use 'items' to be consistent with the reducer
    totalItems: 0,
    totalPrice: 0,
  };
  
  // Reducer function to handle cart actions
  const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_ITEM': {
        const updatedItems = [...state.items, action.item];
        const totalItems = updatedItems.reduce((sum, item) => sum + item.count, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.product.price*item.count, 0); 
        return { items: updatedItems, totalItems, totalPrice }
      }
      case 'REMOVE_ITEM': {
        const updatedItems = state.items.filter(item => item.product._id !== action.id);
        const totalItems = updatedItems.reduce((sum, item) => sum + item.count, 0);
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.product.price*item.count, 0);
  
        return {  items: updatedItems,  totalItems, totalPrice }
      }
      case 'CHANGE_ITEM': {
        const updatedItems = state.items.map(item =>
            item.product._id === action.id
              ? { ...item, count: action.count }
              : item
          )
        const totalItems = updatedItems.length;
        const totalPrice = updatedItems.reduce((sum, item) => sum + item.product.price*item.count, 0);
  
        return {  items: updatedItems,  totalItems, totalPrice }
      }
      case 'CLEAR_CART': {
        return { items: [], totalItems: 0, totalPrice: 0 }
      }
      default:
        return state;
    }
  };

  
  const CartContext = createContext();
  
  export const CartProvider = ({ children }) => {
    const [cart, dispatch] = useReducer(cartReducer, initCart);

    const addItem = (item) => {
        dispatch({ type: 'ADD_ITEM', item });
    };

    const changeItem = (id , count) => {
        dispatch({ type: 'CHANGE_ITEM',  id , count});
    };

    const removeItem = (id) => {
        dispatch({ type: 'REMOVE_ITEM', id });
    };
    
    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' });
    };


    
      return (
        <CartContext.Provider value={{ cart, addItem, removeItem, changeItem, clearCart }}>
          {children}
        </CartContext.Provider>
      );
  };
  
  export const useCart = () => useContext(CartContext);