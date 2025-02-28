const express = require("express");
const app = express();
const mongoose = require("./database");
const Product = require("./models/Product");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const cors = require("cors");
app.use(cors());
app.use(express.json());


const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

app.use("/uploads", express.static("uploads"));

app.post("/create", upload.single("image"), async (req, res) => {
  try {
    console.log("Body Data:", req.body);
    console.log("File Data:", req.file);

    if (!req.file) {
      return res.status(400).json({ error: "Image upload failed" });
    }

    const { uid, name, category, price } = req.body;
    if (!name || !category || !price ||! uid) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newProduct = new Product({
      uid,
      name,
      category,
      price,
      imageUrl: `http://localhost:3000/uploads/${req.file.filename}`,
    });

    const savedProduct = await newProduct.save();

    res.json({
      message: "Product created successfully!",
      product: savedProduct,
    });

  } catch (error) {
    console.error("Error saving product:", error);
    res.status(500).json({ error: "Failed to save product" });
  }
});


app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});




const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started at: http://localhost:${PORT}`);
});
