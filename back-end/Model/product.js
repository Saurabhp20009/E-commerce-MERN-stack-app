const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: String, require: true },
  description: { type: String, require: true },
  imageDir: { type: String, require: true },
  rating: { type: String, require: true },
});


const productModel = mongoose.model("product", productSchema);

module.exports = { productModel };