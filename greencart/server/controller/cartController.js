// // controller/cartController.js

// const Cart = require("../models/CartModel");

// const attachUserToCart = async (req, res) => {
//   try {
//     const { userId, products } = req.body;

//     // Check if user already has a cart
//     let existingCart = await Cart.findOne({ userId });

//     if (existingCart) {
//       // Merge guest cart into user cart
//       products.forEach(({ productId, quantity }) => {
//         const index = existingCart.products.findIndex(
//           (p) => p.productId.toString() === productId
//         );
//         if (index > -1) {
//           existingCart.products[index].quantity += quantity;
//         } else {
//           existingCart.products.push({ productId, quantity });
//         }
//       });

//       await existingCart.save();
//       return res.status(200).json({ message: "User cart updated", data: existingCart });
//     }

//     // Create new cart
//     const newCart = new Cart({ userId, products });
//     const savedCart = await newCart.save();
//     return res.status(201).json({ message: "Cart created for user", data: savedCart });
//   } catch (err) {
//     return res.status(500).json({ message: "Error attaching user to cart", error: err.message });
//   }
// };

// module.exports = {attachUserToCart};

const Cart = require("../models/CartModel");
const Billing = require("../models/BillingModel");

const addCartandBilling = async(req,res)=>{
  try {
    const { userId, products, totalAmount, paymentMethod, paymentStatus } = req.body;
    // Validate input
    if (!userId || !products || products.length === 0 || !totalAmount || !paymentMethod) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCart = new Cart({userId,products});
    const saveCart = await newCart.save();

    const newBilling = new Billing({
      userId,
      cartId: saveCart._id,
      totalAmount: totalAmount,
      paymentMethod: paymentMethod,
      paymentStatus: paymentStatus || 'Pending',
    })
     const savedBilling = await newBilling.save();

    return res.status(201).json({
      message: "Cart and billing saved successfully",
      cart: saveCart,
      billing: savedBilling,
    });

  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {addCartandBilling};