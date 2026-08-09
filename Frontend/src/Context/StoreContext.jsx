import { createContext, useEffect, useState, useMemo, useCallback } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

export const StoreContextProvider = (props) => {


    const [cartItems, setCartItems] = useState({});
    const [food_list, setFoodList] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const url = "https://food-delivery-app-yi0a.onrender.com";
    const [token, setToken] = useState("");
    const [userRole, setUserRole] = useState(localStorage.getItem('userRole') || 'customer');
    const [userName, setUserName] = useState(localStorage.getItem('userName') || '');
    const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail') || '');


    const addToCart = async (itemId) => {
        if (!cartItems[itemId]) {
            setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
        }
        else {
            setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
        }

        if(token){
             await axios.post(url+"/api/cart/add",{itemId},{headers:{token}})
        }
    }



    const removeFromCart = async(itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))

        if(token){
            await axios.post(url+"/api/cart/remove",{itemId},{headers:{token}}) 
        }
    }

    const deleteFromCart = (itemId) => {
        setCartItems((prev) => ({ ...prev, [itemId]: 0 }))
    }

    // useMemo: only recalculates when cart or food list changes
    const getTotalCartAmount = useMemo(() => {
        let totalAmount = 0;
        for (const item in cartItems) {
            if (cartItems[item] > 0) {
                const itemInfo = food_list.find((product) => product._id === item);
                if (itemInfo) {
                    totalAmount += itemInfo.price * cartItems[item];
                }
            }
        }
        return totalAmount;
    }, [cartItems, food_list]);
    const fetchFoodList = async () => {
        const response = await axios.get(url + "/api/food/list");
        setFoodList(response.data.data);
    }
 const loadCartData=async(token)=>{
   const response=await axios.post(url+"/api/cart/get",{},{headers:{token}});
     setCartItems(response.data.cartData || {});
 }

    useEffect(() => {
        const cartItems = localStorage.getItem("cartItems")
        if (cartItems) {
            setCartItems(JSON.parse(cartItems))
        }
    }, [])
    useEffect(() => {
        if (localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
        }
        async function loadData() {
            await fetchFoodList();
            const storedToken = localStorage.getItem("token");
            if (storedToken) {
                setToken(storedToken);
                setIsLoggedIn(true);
                // Only load cart for customers
                if (localStorage.getItem('userRole') !== 'owner') {
                    await loadCartData(storedToken);
                }
            }
        }
        loadData();
    }, [])

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        deleteFromCart,
        getTotalCartAmount,
        isLoggedIn,
        setIsLoggedIn,
        url,
        token,
        setToken,
        userRole,
        setUserRole,
        userName,
        setUserName,
        userEmail,
        setUserEmail
    }
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}