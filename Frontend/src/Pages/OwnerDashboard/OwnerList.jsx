import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import './OwnerPages.css'

const OwnerList = ({ url }) => {
    const [list, setList] = useState([]);

    const fetchList = async () => {
        const response = await axios.get(url + "/api/food/list");
        if (response.data.success) setList(response.data.data);
        else toast.error(response.data.message);
    }

    const removeFood = async (id) => {
        const response = await axios.post(`${url}/api/food/remove`, { id });
        await fetchList();
        if (response.data.success) toast.success("Item removed!");
        else toast.error("Error removing item");
    }

    useEffect(() => { fetchList(); }, []);

    return (
        <div className='owner-page'>
            <h2>Food Items</h2>
            <p className='page-sub'>All dishes currently on your menu</p>
            <div className='owner-table'>
                <div className='owner-table-header'>
                    <span>Image</span><span>Name</span><span>Category</span><span>Price</span><span>Remove</span>
                </div>
                {list.filter(item => item.name && item.image).map((item, i) => (
                    <div key={i} className='owner-table-row'>
                        <img src={`${url}/images/${item.image}`} alt={item.name} />
                        <span>{item.name}</span>
                        <span className='category-badge'>{item.category}</span>
                        <span className='price-text'>${item.price}</span>
                        <button className='remove-btn' onClick={() => removeFood(item._id)}>🗑️</button>
                    </div>
                ))}
                {list.filter(i => i.name && i.image).length === 0 && (
                    <div className='empty-state'>No items yet. Add products from the Add Product tab!</div>
                )}
            </div>
        </div>
    )
}

export default OwnerList
