import React, { useState , useEffect} from 'react';
import axios from 'axios';
import Item from './Item'
import './ListItem.css'

const ListItem = ({}) => {

    const listcategory = ['Smartphone' , 'Computer' , 'Tablet' , 'Tv']

    const [listitem , setListItem] = useState(null)
    const [category , setCategory] = useState('')
    const [chunkedList, setChunkedList] = useState([]);


    const getAllProducts = async (category) => {
      try {
        let url = '/products';
        if (category) {
          url += `?category=${category}`;
        }
    
        const result = await axios.get(url);
        setListItem(result.data)
      } catch (error) {
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
        getAllProducts(category)
      } , [category])
  
    useEffect(() => {
        if (listitem) {
          setChunkedList(chunkArray(listitem, 3));
        }
      }, [listitem]);

  return (
    <div className='listitem-container'>
        <table className='listitem-table-container'>
            {listitem? 
                (
                    <tbody>
                    {chunkedList.map((chunk, rowIndex) => (
                      <tr key={rowIndex}>
                        {chunk.map((item, index) => (
                          <td key={index}>
                            <Item item={item} />
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
        <div className='listitem-category-container'>
            <label>Category</label>
            <ul className='listitem-category'>
                {listcategory.map((category,index) => (
                    <li key={index} onClick={(e)=> setCategory(category)}><img src='' alt=''/>{category}</li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default ListItem;


