import React from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useEffect } from 'react'


const List = ({ url }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(url + "/api/food/list");
    if (response.data.success) {
      setList(response.data.data);
    }
    else {
      toast.error(response.data.message);
    }
  }
  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    // we are using axios beacuse we are making an api call to the backend

    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error("Error removing food item");
    }
  }
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <div className='list flex-col'>
      <h2>Food Items</h2>
      <p className='page-sub'>All dishes currently on your menu</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.filter(item => item.name && item.image).map((item, index) => {
          return (
            <div key={index} className='list-table-format'>
              <img src={`${url}/images/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>${item.price}</p>
              <p onClick={() => removeFood(item._id)} className='cursor' title='Delete'>🗑️</p>
            </div>
          )
        })}
        {list.filter(item => item.name && item.image).length === 0 && (
          <div className='list-empty'>
            <p>No food items added yet. Go to <strong>Add Product</strong> to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default List