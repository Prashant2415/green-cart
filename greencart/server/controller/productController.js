const Product = require("../models/ProductModel");

const addNewProducts = async (req, res) => {
  try {
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ message: "Send a non-empty array of products" });
    }

    const savedProducts = await Product.insertMany(products);
    return res.status(201).json({ message: "Data saved successfully", data: savedProducts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const productDetails = await Product.find();
    return res.status(200).json({ message: "Product data", data: productDetails });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const deleteAll = async(req,res)=>{
  try {
    const status = await Product.deleteMany();
    return res.status(200).json({message: "Deleted"})
  } catch (error) {
    return res.status(500).json({message: error});
  }
}

module.exports = { addNewProducts, getAllProducts, deleteAll };
