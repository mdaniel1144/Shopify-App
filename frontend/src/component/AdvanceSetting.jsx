import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import FormUsers from './FormUsers';
import FormProducts from './FormProducts';
import './AdvanceSetting.css'

const AdvanceSetting = ({user}) => {

  const models = ['Products', 'Users'];
  const navigate = useNavigate();

  const [listData , setListData] = useState([])
  const [modelSelected , setModelSelected] = useState(models[0])
  const [data , setData] = useState()
  const [isItem , setIsItem] = useState(false)
  const [question , setQuestion] = useState('')
  const [answer , setAnswer] = useState('')
  const [error , setError] = useState('')

  

  useEffect(()=>{
    const getAllData = async (question , answer) => {
      try {
        let url = `/${modelSelected.toLowerCase()}`;
        if (question && answer) {
          url += `?question=${question}&answer=${answer}`;
        }
        const result = await axios.get(url);
        console.log(result)
        setListData(result.data)
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };
     getAllData(question, answer)
  } , [modelSelected])


  const GetStatics = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/UpdatePasswordSubmit', { }, { withCredentials: true });
      setError(null); // Clear any previous error
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handelDeleteData = async () => {
    try {
      console.log(data._id)
      const response = await axios.delete(`/${modelSelected.toLowerCase()}/delete/${data._id}`);
      setListData(listData.filter(item => item._id !== data._id));
      navigate('/AdvanceSetting');
    } catch (error) {
      console.error('Error deleting Item:', error);
      setError('Failed to delete Item');
    }
  };
  
  return (
    <div className='advanceSetting-container'>
      <div className='advanceSetting-model-container'>
        <h1>Admin Setting</h1>
        <ul>
        {models.map((model) => (
          <li key={model} onClick={(e)=> {setModelSelected(model); setIsItem(false)}}>{model}</li>
        ))}
        </ul>
      </div>
      <table>
        <thead style={{display: 'block'}}>
          {isItem? 
            (<tr class='advanceSetting-command'>
                <th>
                  <button className='advanceSetting-button-back'  onClick={(e)=> setIsItem(false)}><FaArrowLeft style={{ marginRight: '15px' }}/>Back</button>
                  <button className='advanceSetting-button-update' onClick={handelDeleteData}><FaTrash  style={{ marginRight: '15px' }} />Delete</button>
                </th>
            </tr>)
            : 
            (
              <tr class='advanceSetting-command'><th><button className='advanceSetting-button-update' onClick={(e)=> {setIsItem(true) ; setData(null)}}><FaPlus  style={{ marginRight: '15px' }}/>Create New</button></th></tr>)
            }
        </thead>
        <tbody className='modellist-group-container'>
          {modelSelected === 'Products' &&
          (
            <div className='modellist-group-container'>
              {isItem? (<FormProducts product={data}/> )
                :
                (
                  listData.map((product , index) => (
                <tr key={index} className='modelitem-container' onClick={(e) => {setIsItem(!isItem); setData(product)}}>
                  <td><label>Serial: {product.serial} - {product.name}</label></td>
                </tr>))
                )}
            </div>)}
            {modelSelected === 'Users' &&
            (
            <div className='modellist-container'>
              {isItem? (<FormUsers user={data}/> )
                :
                (
                listData.map((user , index) => (
                <tr key={index} className='modelitem-container' onClick={(e) => {setIsItem(!isItem); setData(user)}}>
                  <td><label>{user.username} , {user.email}</label></td>
                </tr>))
                )}
            </div>)}
        </tbody>
      </table>
    </div>
  );
};

export default AdvanceSetting;