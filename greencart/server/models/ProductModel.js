    const mongoose = require('mongoose');

    const productSchema = new mongoose.Schema({
        uniqueId: { type: Number },
        name: { type: String, required: true },
        imageURL: { type: String },
        price: { type: Number, required: true },
        quantity: { type: Number },
        category: { type: String, enum: ['Tree','Shrubs','Covers','Creeper']},
        height: { type: String}
    });

    module.exports = mongoose.model('Product', productSchema);
