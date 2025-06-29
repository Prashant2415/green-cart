const express = require("express");
const { attachUserToCart, addCartandBilling } = require("../controller/cartController");
const cartRouter = express.Router();

//API calls
// cartRouter.post("/addToCart", attachUserToCart);
cartRouter.post("/addCartandBilling", addCartandBilling);
module.exports = cartRouter;