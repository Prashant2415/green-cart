const mongoose = require("mongoose");
const Billing = require("../models/BillingModel");

const getBillingDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const objectId = new mongoose.Types.ObjectId(id);

    const billingDetails = await Billing.find({ userId: objectId })
      .populate("userId", "name email")
      .populate({
        path: "cartId",
        populate: {
          path: "products.productId",
          model: "Product" // 👈 Make sure this matches your Product model name
        }
      })
      .sort({ billingDate: -1 });

    if (!billingDetails || billingDetails.length === 0) {
      return res.status(404).json({ message: "No billing records found for this user" });
    }

    res.status(200).json({ message: "Billing details fetched", data: billingDetails });

  } catch (error) {
    res.status(500).json({ message: "Error retrieving billing details", error: error.message });
  }
};

module.exports = { getBillingDetails };
