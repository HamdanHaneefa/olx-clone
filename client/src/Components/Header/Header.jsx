import React, { useContext, useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Header.css';
import OlxLogo from '../../assets/OlxLogo.jsx';
import Search from '../../assets/Search.jsx';
import Arrow from '../../assets/Arrow.jsx';
import SellButton from '../../assets/SellButton.jsx';
import SellButtonPlus from '../../assets/SellButtonPlus.jsx';
import { AuthContext, FirebaseContext } from '../../store/Context.jsx';
import { getAuth, signOut } from 'firebase/auth';

function Header() {
  const { user } = useContext(AuthContext);
  const { firebase } = useContext(FirebaseContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const loginRef = useRef(null);


  useEffect(() => {
    function handleClickOutside(event) {
      if (loginRef.current && !loginRef.current.contains(event.target)) {
        setShowLogout(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    setLoading(true);
    const auth = getAuth();
    
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error("Logout error:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <Link to={'/'} aria-label="OLX Home"> 
            <OlxLogo /> 
          </Link>
        </div>

        <div className="placeSearch">
          <Search />
          <input type="text" placeholder="Location" aria-label="Search location" />
          <Arrow />
        </div>

        <div className="productSearch">
          <div className="input">
            <input 
              type="text" 
              placeholder="Find cars, mobile phones and more..." 
              aria-label="Search products"
            />
          </div>
          <div className="searchAction" aria-label="Search">
            <Search color="#ffffff" />
          </div>
        </div>
     
        <div 
          className="loginPage"
          ref={loginRef}
          onMouseEnter={() => setShowLogout(true)}
          onMouseLeave={() => setShowLogout(false)}
        >
          {user ? (
            <span className="welcome-text" title={`Logged in as ${user.displayName}`}>
              {`Welcome ${user.displayName}`}
            </span>
          ) : (
            <Link to="/login">
              <span>Login</span>
            </Link>
          )}
          
          {user && showLogout && (
            <button 
              onClick={handleLogout} 
              className="logout-button" 
              disabled={loading}
              aria-label="Logout"
            >
              {loading ? (
                <>
                  <div className="loader" aria-hidden="true"></div>
                  <span>Logging out</span>
                </>
              ) : "Logout"}
            </button>
          )}
        </div>
        {user && 
        <Link to="/create" className="sellMenu" aria-label="Sell an item">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </Link>
}
      </div>
    </div>
  );
}

export default Header;