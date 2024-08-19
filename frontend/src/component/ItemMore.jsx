import React, { useState, useEffect ,useContext} from 'react';
import { AuthContext } from './AuthContext';
import {FaTimes} from 'react-icons/fa';
import './ItemMore.css';
import axios from 'axios';


const ItemMore = ({ item , setIsItemMore}) => {

    const { user } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [content , setContent] = useState('')
    const [criticismList , setCriticismList] = useState([])



    const handelInsertComment = async (event) => {
        event.preventDefault();
        try {
              console.log(user)
              await axios.post('/criticism/insert', {
                productID: item._id,
                content,
                userID : user.id,
              })
              setIsItemMore(false)
        } catch (err) {
              console.error(err.response?.data?.error || 'An error occurred.');
        }
    }

    useEffect(()=>{
        const fetchCriticism = async () => {
            try {
                const response = await axios.get(`/criticism`, {
                params: { productID: item._id }
              });
              console.log(response)
              setCriticismList(response.data); // Assuming the API returns the product details in the `data` field
            } catch (err) {
              console.error(err?.message);
            } finally {
              setIsLoading(false);
            }
          };
      
          fetchCriticism()
        }, [])

    return (
        <section>
            <div className='itemMore-close' onClick={(e)=> setIsItemMore(false)}></div>
        <div className='itemMore-container'>
            <button className='itemMore-button-back'  onClick={(e)=> setIsItemMore(false)}><FaTimes style={{ height: '40px' ,width: '40px'}}/></button>
            <div className='itemMore-profile-image'>
                {item.image ? (<img className='itemMore-image' src={item.image}/>) : (<label>No Found Image</label>)}
            </div>
            <div className='itemMore-profile-details'>
                <label><b>Serial Number: </b>{item.serial}</label>
                <label><b>Name: </b>{item.name}</label>
                <label><b>Category: </b>{item.category}e</label>
                <label><b>Price: </b>{item.price}</label>
                <label><b>Brand: </b>{item.brand}</label>
                <label><b>Description: </b>{item.description}</label>
            </div>
            <div className='itemMore-criticism-container'>
                <h5>Comments</h5>
                <table>
                {criticismList.map((criticism, rowIndex) => (
                    <tr key={rowIndex}>
                        <td style={{ width: '20%' }}> <label><b>{criticism.username}:</b></label></td>
                        <td  style={{ width: '80%'}}><span>{criticism.content}</span></td>
                    </tr>
                ))}
                </table>
                <div className='itemMore-criticism-command'>
                    <input type='text' value={content} onChange={(e)=> setContent(e.target.value)}/>
                    <button onClick={(e) =>handelInsertComment(e)}>send</button>
                </div>
            </div>
        </div>
        </section>
    );
};

export default ItemMore;