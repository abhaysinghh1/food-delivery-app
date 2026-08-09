import React, { useState, useContext, useRef, useEffect } from 'react'
import './search_icon.css'
import { StoreContext } from '../../Context/StoreContext'
import { assets } from '../../assets/assets'

const SearchPopup = ({ setShowSearch }) => {
    const [query, setQuery] = useState("");
    const { food_list, addToCart } = useContext(StoreContext);
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const filteredItems = query.trim()
        ? food_list.filter(item =>
            item.name.toLowerCase().includes(query.toLowerCase()) ||
            item.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <div className='search-popup' onClick={() => setShowSearch(false)}>
            <div className='search-popup-container' onClick={(e) => e.stopPropagation()}>
                <div className='search-header'>
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder='Search for dishes...'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <img onClick={() => setShowSearch(false)} src={assets.cross_icon} alt="close" className="search-close" />
                </div>
                <div className='search-results'>
                    {query.trim() && filteredItems.length === 0 && (
                        <p className='no-results'>No dishes found for "{query}"</p>
                    )}
                    {filteredItems.map((item) => (
                        <div key={item._id} className='search-result-item'>
                            <img src={item.image} alt={item.name} />
                            <div className='search-result-info'>
                                <p className='search-result-name'>{item.name}</p>
                                <p className='search-result-category'>{item.category}</p>
                            </div>
                            <p className='search-result-price'>${item.price}</p>
                            <button onClick={() => addToCart(item._id)}>+</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default SearchPopup