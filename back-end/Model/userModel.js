const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, require: true },
  userEmail: { type: String, require: true },
  password: { type: String, require: true },
  cartProduct: [{type:mongoose.Schema.Types.ObjectId,ref:"carts"}]
});

const userModel = mongoose.model("users", userSchema);

module.exports = { userModel };
