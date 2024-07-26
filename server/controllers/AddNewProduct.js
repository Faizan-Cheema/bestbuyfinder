// controllers/productController.js
import NewProduct from '../models/NewProduct.js';

export const addProduct = async (req, res) => {
  console.log(req.body); // Log request body for debugging
  try {
    const productPhotos = req.files ? req.files.map(file => file.filename) : [];

    const newProduct = new NewProduct({
      user_id: req.body.user_id || "1", // Use user_id from the request body
      name: req.body.productName,
      price: req.body.productPrice,
      description: req.body.productDescription,
      location: req.body.productLocation,
      phoneNumber: req.body.phoneNumber,
      productPhotos: productPhotos,
      source: "Best Buy Finder", // Adjust as needed based on where source comes from
    });

    await newProduct.save();
    res.status(201).json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ success: false, error: error.message });
  }
};
