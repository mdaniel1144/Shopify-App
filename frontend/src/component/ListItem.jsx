import React, { useState , useEffect, useContext } from 'react';
import RangePrice from './RangePrice';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import Item from './Item'
import ItemMore from './ItemMore'
import './ListItem.css'

const ListItem = () => {

  const listcategory = ['Smartphone' , 'Computer' , 'Tablet' , 'Tv']
  const listBrand = ['LG ' , 'Sony' , 'Apple' , 'Samsung']


  const [listitem , setListItem] = useState(null)
  const [isItemMore , setIsItemMore] = useState(false)
  const [selectedItem , setSelcetedItem] = useState(null)
  const [copyListItem , setCopyListItem] = useState(null)
  const [chunkedList, setChunkedList] = useState([]);
  const [category , setCategory] = useState('')
  const [brand , setBrand] = useState('')
  const [priceRange , setPriceRange] = useState({'min' : 0 , 'max': 5000}) 
  const {search} = useContext(AuthContext)


  const getAllProducts = async () => {
    try {
      let url = '/products'+ `?category=${category}&brand=${brand}`;
      const result = await axios.get(url);
      setListItem(result.data)
      setCopyListItem(result.data)
    }
    catch (error) {
      console.error('There was an error fetching the data!', error);
    }
  };

    const chunkArray = (arr, chunkSize) => {
        const chunks = [];
        for (let i = 0; i < arr.length; i += chunkSize) {
          chunks.push(arr.slice(i, i + chunkSize));
        }
        return chunks;
    };


    useEffect(()=>{
        getAllProducts()
      } , [category , brand])
  
    useEffect(() => {
        if (copyListItem) {
          setChunkedList(chunkArray(copyListItem, 2));
        }
      }, [copyListItem]);

      useEffect(() => {
        if (listitem){
          const filteredItems = listitem.filter(item => item.price <= priceRange.max && item.price >= priceRange.min);
          setCopyListItem(filteredItems)}
      }, [priceRange]);

    useEffect(()=>{
      if(listitem){
        const newListItem = listitem.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        setCopyListItem(newListItem)
      }
    }, [search])


  return (
    <div className='listitem-container'>
      {isItemMore && (<ItemMore item={selectedItem} setIsItemMore={setIsItemMore}/>)}
        <div className='listitem-category-container'>
            <label>Category</label>
            <ul className='listitem-category'>
                {listcategory.map((category,index) => (
                    <li key={index} onClick={(e)=> {setCategory(category)}}><img src='' alt=''/>{category}</li>
                ))}
            </ul>
            <div className='listitem-price'>
              <label>Price</label>
                <RangePrice min={0}  max={5000}  gap= {50} setPriceRange={setPriceRange}/>
            </div>
        </div>
        <table className='listitem-table-container'>
            {listitem? 
                (
                    <tbody>
                    {chunkedList.map((chunk, rowIndex) => (
                      <tr key={rowIndex}>
                        {chunk.map((item, index) => (
                          <td key={index} onClick={(e)=>{setSelcetedItem(item) ; setIsItemMore(true)}}>
                            <Item item={item}/>
                          </td>
                        ))}
                        {chunk.length < 2 && <td></td>} {/* Add an empty cell if there's only one item in the row */}
                      </tr>
                    ))}
                  </tbody>
                ) 
                :
                (null)
            }
        </table>

    </div>
  );
};

export default ListItem;


