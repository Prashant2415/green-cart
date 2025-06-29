const express = require("express");
const { verifyUser } = require("../controller/authController");
const { addNewProducts, getAllProducts, deleteAll } = require("../controller/productController");
const productRouter = express.Router();

//API calls
productRouter.post("/addNewProducts", verifyUser(['Admin']),addNewProducts);
productRouter.get("/getAllProducts", getAllProducts);
productRouter.delete("/deleteAll", deleteAll);

module.exports = productRouter;