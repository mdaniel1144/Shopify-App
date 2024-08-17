import React, { useEffect, useState , useContext} from 'react';
import axios from 'axios';
import { FaArrowLeft, FaPlus, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import SalesList from './SalesList';
import Loading from './Loading'
import './Sales.css'

const Sales = ({user}) => {

  const navigate = useNavigate();
  const [salesList , setSalesList] = useState([])
  const [copySalesList , setCopySalesList] = useState(null)
  const [isLoading , setIsLoading] = useState(true)
  const [data , setData] = useState()
  const [isItem , setIsItem] = useState(false)
  const [numberOrder , setNumberOrder] = useState('')
  const [salePrice,setSalePrice] = useState(0)
  const [totalPrice , setTotalPrice] = useState(0)
  const [numberSales , setNumberSales] = useState(0)
  const {search} = useContext(AuthContext)
  const [error , setError] = useState('')


  useEffect(()=>{
    const getAllData = async () => {
      try {
        setIsLoading(true)
        const response = await axios.get('/sales', {params: { userID: user.id }})
        setSalesList(response.data)
        setCopySalesList(response.data)
        setIsLoading(false)
        setNumberSales(salesList.length)
        setTotalPrice(2)
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };
     getAllData()
  } , [])


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
      setSalesList(salesList.filter(item => item._id !== data._id));
      navigate('/AdvanceSetting');
    } catch (error) {
      console.error('Error deleting Item:', error);
      setError('Failed to delete Item');
    }
  };

  useEffect(()=>{
    if(salesList){
      let newListItem
      newListItem = salesList.filter(sale => sale._id.toLowerCase().includes(search.toLowerCase()))
      setCopySalesList(newListItem)
    }
  }, [search])
  
  return (
    <div>
     {isItem && (<SalesList productIds={data} setIsItem={setIsItem} numberOrder={numberOrder} salePrice={salePrice}/>)}
    <div className='sales-container'>
      <div className='sales-model-container'>
        <h1>Summary History</h1>
        <ul>
            <li>Number of Sales: {numberSales}</li>
            <li>Total Money: {totalPrice}$</li>
        </ul>
      </div>
    <table>
        {!isLoading? 
            (<tbody className='modellist-group-container'>
                <tr>
                    <th>Status</th>
                    <th>Number Order</th>
                    <th>Total Product</th>
                    <th>Price</th>
                </tr>
                {(copySalesList.map((sale , index) => (
                  <tr key={index} className='modelitem-container' onClick={(e) => {setIsItem(!isItem); setData(sale.products) ;setNumberOrder(sale._id); setSalePrice(sale.totalPrice) }}>
                    <td><span className={`sales-status ${sale.status}`}/><label>{sale.status}</label></td>
                    <td>{sale._id}</td>
                    <td>{sale.products.length}</td>
                    <td>{(sale.totalPrice).toFixed(2)}$</td>
                  </tr>)))}
            
            </tbody>)
        :
         (<Loading/>)
        }

      </table>
    </div>    </div> 
  );
};

export default Sales;