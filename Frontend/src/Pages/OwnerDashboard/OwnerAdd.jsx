import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { StoreContext } from '../../Context/StoreContext'
import './OwnerPages.css'

const OwnerAdd = ({ url }) => {
    const { token, fetchFoodList } = React.useContext(StoreContext);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({ name: "", description: "", price: "", category: "Salad" });

    const onChangeHandler = (e) => setData(d => ({ ...d, [e.target.name]: e.target.value }));

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData, { headers: { token } });
        if (response.data.success) {
            setData({ name: "", description: "", price: "", category: "Salad" });
            setImage(false);
            await fetchFoodList();  // refresh food list so home page shows new item immediately
            toast.success("Food item added!");
        } else {
            toast.error(response.data.message);
        }
    }

    return (
        <div className='owner-page'>
            <h2>Add Food Item</h2>
            <p className='page-sub'>Add a new dish to your restaurant menu</p>
            <form onSubmit={onSubmit} className='owner-form'>
                <div className='owner-img-upload'>
                    <label>Upload Image</label>
                    <label htmlFor='owner-image' className='img-upload-area'>
                        {image
                            ? <img src={URL.createObjectURL(image)} alt="" className='preview-img' />
                            : <div className='upload-placeholder'>📷<br />Click to upload</div>}
                    </label>
                    <input onChange={(e) => setImage(e.target.files[0])} type="file" id="owner-image" hidden required />
                </div>
                <div className='owner-field'>
                    <label>Product Name</label>
                    <input name='name' value={data.name} onChange={onChangeHandler} placeholder='e.g. Grilled Chicken' required />
                </div>
                <div className='owner-field'>
                    <label>Description</label>
                    <textarea name='description' value={data.description} onChange={onChangeHandler} rows={4} placeholder='Describe the dish...' required />
                </div>
                <div className='owner-row'>
                    <div className='owner-field'>
                        <label>Category</label>
                        <select name='category' value={data.category} onChange={onChangeHandler}>
                            {["Salad","Rolls","Deserts","Sandwich","Cake","Pure Veg","Pasta","Noodles"].map(c => (
                                <option key={c} value={c}>{c}</option>
                            ))}
                        </select>
                    </div>
                    <div className='owner-field'>
                        <label>Price ($)</label>
                        <input name='price' value={data.price} onChange={onChangeHandler} type='number' placeholder='e.g. 12' required />
                    </div>
                </div>
                <button type='submit' className='owner-btn'>➕ Add Product</button>
            </form>
        </div>
    )
}

export default OwnerAdd
