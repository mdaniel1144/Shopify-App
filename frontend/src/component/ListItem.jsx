import React, { useState , useEffect, useContext} from 'react';
import { AuthContext } from './AuthContext';
import axios from 'axios';
import Item from './Item'
import './ListItem.css'

const ListItem = () => {

    const listcategory = ['Smartphone' , 'Computer' , 'Tablet' , 'Tv']

    const [listitem , setListItem] = useState(null)
    const [copyListItem , setCopyListItem] = useState(null)
    const [chunkedList, setChunkedList] = useState([]);
    const [question , setQuestion] = useState('')
    const [answer , setAnswer] = useState('')
    const {search} = useContext(AuthContext)


    const getAllProducts = async (question , answer) => {
      try {
        let url = '/products';
        if (question && answer) {
          url += `?question=${question}&answer=${answer}`;
        }
        const result = await axios.get(url);
        setListItem(result.data)
        setCopyListItem(result.data)
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
        getAllProducts(question , answer)
      } , [question , answer])
  
    useEffect(() => {
        if (copyListItem) {
          setChunkedList(chunkArray(copyListItem, 3));
        }
      }, [copyListItem]);

    useEffect(()=>{
      if(listitem){
        const newListItem = listitem.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
        setCopyListItem(newListItem)
      }
    }, [search])

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
                    <li key={index} onClick={(e)=> {setQuestion('category'); setAnswer(category)}}><img src='' alt=''/>{category}</li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default ListItem;


