const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
        uniqueId: {type: Number},
        name: {type: String},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true, unique: true},
        address: {type: String},
        phone: {type: Number},
        role: { type: String, enum: ['Admin', 'User'], required: true , default: 'User'},
        isAdmin: {type: Boolean},
    })

module.exports = mongoose.model("User", UserSchema);