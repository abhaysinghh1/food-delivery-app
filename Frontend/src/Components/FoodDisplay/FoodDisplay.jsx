import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'
const FoodDisplay = ({ category }) => {
    const { food_list } = useContext(StoreContext)
    return (
        <div className='Food-display' id='food-display'>
            <h2>Top dishes near you</h2>
            <div className="food-display-list">
                {food_list.filter(item => item.name && item.image).map((item, index) => {
                    if (category === "All" || item.category === category) {
                        return <FoodItem key={index}
                            id={item._id}
                            name={item.name}
                            price={item.price}
                            description={item.description}
                            image={item.image}
                        />
                    }
                    return null;
                })}
            </div>
            
            {food_list.filter(item => item.name && item.image && (category === "All" || item.category === category)).length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
                    <h3>No dishes found</h3>
                    <p>There are currently no items available in this category.</p>
                </div>
            )}

        </div>
    )
}

export default FoodDisplay