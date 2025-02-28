import React, { useState , useContext } from "react";
import axios from "axios";
import "./Create.css";
import Header from "../Header/Header";
import preview from "../../assets/preview.jpg";
import { AuthContext } from "../../store/Context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Create = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const user = useContext(AuthContext);
  const navigate = useNavigate()

  console.log(user.user.uid)

  const handleSubmit = async () => {
    if (!name || !category || !price || !image || !user.user.uid) {
      alert("Please fill all fields and select an image.");
      return;
    }
  
    const formData = new FormData();
    formData.append("uid",user.user.uid)
    formData.append("name", name);
    formData.append("category", category);
    formData.append("price", price.toString());
    formData.append("image", image);
  
    console.log("FormData:", [...formData.entries()]);
  
    try {
      const response = await axios.post("http://localhost:3000/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      toast.success("Item uploaded successfully!", { autoClose: 1200 });

      setTimeout(() => {
        navigate("/");
      }, 1200);

      console.log("Response:", response.data);

      setName("");
      setCategory("");
      setPrice("");
      setImage(null);

    } catch (error) {
      console.error("Error uploading item:", error);
      alert("Failed to upload item.");
    }
  };


  return (
    <div className="pageContainer">
      <Header />
      <div className="createContainer">
        <div className="centerDiv">
          <div className="formField">
            <label htmlFor="name">Name</label>
            <input
              className="input"
              type="text"
              id="name"
              name="Name"
              placeholder="Item name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="formField">
            <label htmlFor="category">Category</label>
            <input
              className="input"
              type="text"
              id="category"
              name="category"
              placeholder="Select category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </div>

          <div className="formField">
            <label htmlFor="price">Price</label>
            <input
              className="input"
              type="number"
              id="price"
              name="Price"
              placeholder="₹0"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="formField">
            <label>Photos</label>
            <img
              alt="Post preview"
              width="120px"
              height="120px"
              src={image ? URL.createObjectURL(image) : preview}
              className="previewImage"
            />
            <input
              onChange={(e) => {
                setImage(e.target.files[0]);
              }}
              type="file"
              className="fileInput"
            />
          </div>

          <button onClick={handleSubmit} type="submit" className="uploadBtn">
            POST NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Create;
