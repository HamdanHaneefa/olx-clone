import React, { useContext, useEffect, useState } from "react";
import Heart from "../../assets/Heart.jsx";
import "./Post.css";
import {PostContext} from "../../store/PostContext.jsx";
import { useNavigate } from "react-router-dom";


function Posts() {
  const [products, setProducts] = useState([]);
  const {setPostDetails} = useContext(PostContext)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="postParentDiv">
      <div className="moreView">
        <div className="heading">
          <span>Quick Menu</span>
          <span>View more</span>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div onClick={() => {
              setPostDetails(product)
              navigate('/view')
            }} className="card" key={product._id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="recommendations">
        <div className="heading">
          <span>Fresh recommendations</span>
        </div>
        <div className="cards">
          {products.slice(0, 4).map((product) => (
            <div className="card" key={product._id}>
              <div className="favorite">
                <Heart />
              </div>
              <div className="image">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="content">
                <p className="rate">&#x20B9; {product.price}</p>
                <span className="kilometer">{product.category}</span>
                <p className="name">{product.name}</p>
              </div>
              <div className="date">
                <span>{new Date(product.createdAt).toDateString()}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
