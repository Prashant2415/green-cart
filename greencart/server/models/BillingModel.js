const mongoose = require('mongoose');

const billingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  cartId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cart' },
  totalAmount: {type: Number},
  paymentMethod: {type: String, default: "Cash on"},
  paymentStatus: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
  billingDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Billing', billingSchema);
