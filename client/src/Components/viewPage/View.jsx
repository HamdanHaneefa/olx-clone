import React, { useEffect, useState, useContext } from "react";
import "./View.css";
import Header from "../Header/Header";
import { PostContext } from "../../store/PostContext";
import { db } from "../../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

function SingleProductView() {
  const { postDetails, setPostDetails } = useContext(PostContext);
  const [userDetails, setUserDetails] = useState(null);
  
  useEffect(() => {
    if (postDetails && postDetails.uid) {

      localStorage.setItem('savedPostDetails', JSON.stringify(postDetails));
      
      const fetchUserDetails = async () => {
        try {

          const q = query(collection(db, "users"), where("id", "==", postDetails.uid));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            querySnapshot.forEach((doc) => {
              setUserDetails(doc.data());
            });
            
          } else {
            console.log("No user found for UID:", postDetails.uid);
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
        }
      };

      fetchUserDetails();
    } else {
      const savedPostDetails = localStorage.getItem('savedPostDetails');
      if (savedPostDetails) {
        setPostDetails(JSON.parse(savedPostDetails));
      }
    }
  }, [postDetails, setPostDetails]);

  if (!postDetails) {
    return (
      <div className="loadingMessage">
        <h2>Loading product details...</h2>
      </div>
    );
  }

  const handleContactSeller = () => {
    alert("Contact seller functionality will be implemented later");
  };

  const handleGoBack = () => {
    alert("Back button clicked");
  };

  return (
    <div className="productViewPage">
      <Header />
      <div className="backNavigation">
        <button className="backButton" onClick={handleGoBack}>
          &larr; Back to Products
        </button>
      </div>

      <div className="productContainer">
        <div className="productImageSection">
          <div className="mainImageContainer">
            <img
              src={postDetails.imageUrl || "https://via.placeholder.com/600x400"}
              alt={postDetails.name || "Product Image"}
              className="mainProductImage"
            />
          </div>
        </div>

        <div className="productDetailsSection">
          <div className="productHeader">
            <h1 className="productName">{postDetails.name || "Unnamed Product"}</h1>
            <p className="productPrice">
              &#x20B9; {postDetails.price ? postDetails.price.toLocaleString() : "N/A"}
            </p>
          </div>

          <div className="productMeta">
            <p className="productCategory">Category: {postDetails.category || "Unknown"}</p>
            <p className="productDate">
              Posted: {postDetails.createdAt ? new Date(postDetails.createdAt).toDateString() : "Unknown Date"}
            </p>
          </div>

          <div className="productDescription">
            <h3>Description</h3>
            <p>
              {postDetails.description || "No description available for this product."}
            </p>
          </div>

          <div className="sellerSection">
            <h3>Seller Information</h3>
            <div className="sellerInfo">
              <div className="sellerAvatar">
                <div className="defaultAvatar">
                  {userDetails ? userDetails.name?.charAt(0).toUpperCase() : "S"}
                </div>
              </div>
              <div className="sellerDetails">
                <p className="sellerName">
                  Seller: {userDetails ? userDetails.username || "Unknown Seller" : "Fetching..."}
                </p>
                <p className="sellerPhone">
                  Phone: {userDetails ? userDetails.phone || "Phone number not available" : "Fetching..."}
                </p>
              </div>
            </div>
          </div>

          <div className="actionButtons">
            <button className="contactButton" onClick={handleContactSeller}>
              Contact Seller
            </button>
            <button className="reportButton">Report Item</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleProductView;