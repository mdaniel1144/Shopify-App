import React, { useEffect, useState , useContext} from 'react';
import {FaTimes} from 'react-icons/fa';
import axios from 'axios';
import Loading from './Loading'
import './SalesList.css'

const SalesList = ({numberOrder, salePrice ,productIds , setIsItem}) => {

  const [prodtuctList , setProdtuctList] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [error , setError] = useState('')

  useEffect(()=>{
    const fetchProducts = async () => {
        try {
          // Construct the query parameter from the list of product IDs
          const idsParam = productIds.map(item => item.itemID).join(',');
          console.log(idsParam)
          const response = await axios.get(`/products`, {
            params: { ids: idsParam }
          });
          console.log(response.data)
          setProdtuctList(response.data); // Assuming the API returns the product details in the `data` field
        } catch (err) {
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
  
      fetchProducts()
    }, [productIds])
  
  return (
    <div>
    <div className='salesList-close' onClick={(e)=> setIsItem(false)}></div>
    <div className='salesList-container'>
        {!isLoading? (
        <table>
          <button className='salesList-button-back'  onClick={(e)=> setIsItem(false)}><FaTimes /></button>
          <br/>
          <thead>
            <h4>List of Order: {numberOrder}</h4>
            <h4>Price : {salePrice}$</h4>
          </thead>
          <tbody className='salesList-modellist-group-container'>
            <tr>
                <th>Image</th>
                <th>Serial</th>
                <th>Brand</th>
                <th>Category</th>
                <th>Count</th>
                <th>Price</th>
            </tr>
            {(prodtuctList.map((product , index) => (
                  <tr key={index} className='salesList-modelitem-container'>
                    <td><img src={product.image}/></td>
                    <td><label>{product.serial}</label></td>
                    <td><label>{product.brand}</label></td>
                    <td><label>{product.category}</label></td>
                    <td><label>{productIds[index].count}</label></td>
                    <td><label>{(product.price).toFixed(2)}$</label></td>
            </tr>)))}
            </tbody>
      </table>)
      :
      (null)}

    </div></div>
  );
};

export default SalesList;