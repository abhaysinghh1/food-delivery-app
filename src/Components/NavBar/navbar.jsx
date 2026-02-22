import React, { useContext, useState, useEffect } from 'react'
import './navbar.css'
import { assets } from '../../assets/assets'
import { useTheme } from '../../Context/ThemeContext'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { StoreContext } from '../../Context/StoreContext'
import SearchPopup from '../search_icon/search_icon'

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("Mobile_App");
  const { isDarkMode, toggleTheme } = useTheme();
  const { getTotalCartAmount } = useContext(StoreContext);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (menuName, sectionId) => {
    setMenu(menuName);
    if (location.pathname === '/') {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { state: { scrollTo: sectionId } });
    }
  }

  useEffect(() => {
    if (location.state?.scrollTo) {
      setTimeout(() => {
        document.getElementById(location.state.scrollTo)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location]);

  return (
    <>
      <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
          <Link to='/' onClick={() => setMenu("Home")} className={menu === "Home" ? "active" : ""}> Home</Link>
          <a href='#explore-menu' onClick={(e) => { e.preventDefault(); handleNavClick("Menu", "explore-menu"); }} className={menu === "Menu" ? "active" : ""}>Menu</a>
          <a href='#app-download' onClick={(e) => { e.preventDefault(); handleNavClick("Mobile_App", "app-download"); }} className={menu === "Mobile_App" ? "active" : ""}>Mobile_App</a>
          <a href='#footer' onClick={(e) => { e.preventDefault(); handleNavClick("Contact Us", "footer"); }} className={menu === "Contact Us" ? "active" : ""}>Contact Us</a>
        </ul>
        <div className="navbar-right">
          <img src={assets.search_icon} alt="" onClick={() => setShowSearch(true)} style={{ cursor: 'pointer' }} />
          <div className="navbar-search-icon">
            <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
            {getTotalCartAmount() > 0 && <div className="dot"></div>}
          </div>
          <button className="signin-btn" onClick={() => setShowLogin(true)}  >Sign In</button>
          <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle dark mode" id="theme-toggle-btn">
            <div className={`toggle-track ${isDarkMode ? 'dark' : ''}`}>
              <span className="toggle-icon sun">☀️</span>
              <span className="toggle-icon moon">🌙</span>
              <div className="toggle-thumb"></div>
            </div>
          </button>
        </div>
      </div>
      {showSearch && <SearchPopup setShowSearch={setShowSearch} />}
    </>
  )
}

export default Navbar
