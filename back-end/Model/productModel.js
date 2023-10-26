const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({

  
  productId: {type:mongoose.Schema.ObjectId,ref:"products"},
  userId: {type:mongoose.Schema.ObjectId,ref:"users"},
  quantity: { type: String, require: true }
});

const cartModel = mongoose.model("cart", CartSchema);

module.exports = { cartModel };
