import React, { useContext, useState } from 'react';
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
  const [loading, setLoading] = useState(false);  // Loader state

  const handleLogout = () => {
    setLoading(true); // Start loader
    const auth = getAuth();
    
    signOut(auth)
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error("Logout error:", error);
      })
      .finally(() => {
        setLoading(false); // Stop loader
      });
  };

  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo />
        </div>
        <div className="placeSearch">
          <Search />
          <input type="text" />
          <Arrow />
        </div>
        <div className="productSearch">
          <div className="input">
            <input type="text" placeholder="Find car, mobile phone and more..." />
          </div>
          <div className="searchAction">
            <Search color="#ffffff" />
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow />
        </div>
        <div className="loginPage">
          <Link to="/login">
            <span>{user ? `Welcome ${user.displayName} ` : "Login"}</span>
          </Link>
          <hr />
        </div>

        {user && (
          <Link>
            <span onClick={handleLogout} className="logout-button" disabled={loading}>
              {loading ? <div className="loader"></div> : "Logout"}
            </span>
          </Link>
        )}

        <div className="sellMenu">
          <SellButton />
          <div className="sellMenuContent">
            <SellButtonPlus />
            <span>SELL</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
