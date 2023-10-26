const { productModel } = require("../Model/product");
const { cartModel } = require("../Model/productModel");
const { userModel } = require("../Model/userModel");

const addCart = async (req, res) => {
  const { userId } = req.params;
  const { productId } = req.body;
  quantity = 1;

  let user = await userModel.findOne({ _id: userId });

  if (!user) {
    return res.json({ message: "user doesn't found" });
  }

  let saveCartProduct = cartModel({
    productId,
    userId,
    quantity,
  });
  const result = await saveCartProduct.save();

  // console.log(user);
  user.cartProduct = user.cartProduct.push(result._id);
  //console.log(user.cartProduct);
  let saveProductInCart = await userModel.updateOne(
    { _id: userId },
    { $set: { cartProduct: user.cartProduct } }
  );

  //console.log(saveProductInCart)
  res.send(saveProductInCart);
};

//api to add product in db
const addProduct = async (req, res) => {
  const { name, price, description, imageDir, rating } = req.body;

  if (!name || !price || !description || !imageDir || !rating) {
    return res.json({ message: "Please fill the all details" });
  }

  let saveProduct = productModel(req.body);
  const result = await saveProduct.save();
  res.send(result);
};

//api to update productQuantity in db
const updateCartProductQuantity = async (req, res) => {
  const { cartProductId, value } = req.body;

  if (value === true) {
    let cartProduct = await cartModel.findOne({ _id: cartProductId });
    if (cartProduct.quantity <= 10) {
      cartProduct.quantity = Number(cartProduct.quantity) + Number(1);
      let result = await cartModel.updateOne(
        { _id: cartProductId },
        { $set: { quantity: cartProduct.quantity } }
      );
      res.send(result);
    } else {
      return res.json({
        message: "You reached the maximum quantity of product",
      });
    }
  } else if (value === false) {
    let cartProduct = await cartModel.findOne({ _id: cartProductId });

    if (cartProduct.quantity > 1) {
      cartProduct.quantity = Number(cartProduct.quantity) - Number(1);
      let result = await cartModel.updateOne(
        { _id: cartProductId },
        { $set: { quantity: cartProduct.quantity } }
      );
      res.send(result);
    } else {
      return res.json({
        message: "You reached the minimum quantity of product",
      });
    }
    ``;
  }
};

//remove the product from the cart
const removeCartProduct = async (req, res) => {
  //const { cartProductId } = req.params;
  //const { userId } = req.params;

  // try {
  //   let user = await userModel.findOne({ _id: userId });
  //   let tempArr = [...user.cartProduct];

  //   user.cartProduct = tempArr.filter((item) => {
  //     return item._id != cartProductId;
  //   });

  //   console.log("tempArr", user.cartProduct);
  //   let result = await userModel.updateOne(
  //     { _id: userId },
  //     { $set: { cartProduct: user.cartProduct } }
  //   );
  //   result = await cartModel.deleteOne({ _id: cartProductId });

  //   res.send(result);
  // } catch (error) {
  //   res.json({ message: "error" });
  // }

  try {

    let cartProductObject = await cartModel.findOne(req.params);
    let user = await userModel.findOne({ _id: cartProductObject.userId });
    let tempArr = [...user.cartProduct];
    user.cartProduct = tempArr.filter((item) => {
      return item._id != req.params._id;
    });
    console.log(user.cartProduct)

    let result1 = await userModel.updateOne(
      { _id: user._id },
      { $set: { cartProduct: user.cartProduct } }
    );
    console.log(result1);

    let result = await cartModel.deleteOne(req.params);
    res.send(result);
  } catch (error) {
    res.json({ message: "error" });
  }
};

const getAllProduct = async (req, res) => {
  let result = await productModel.find();

  res.send(result);
};

const getUserCartProduct = async (req, res) => {
  console.log(req.params);

  let result = await cartModel.find(req.params);
  res.send(result);
};

const getSpecificCartPro = async (req, res) => {
  console.log(req.params);
  let result = await cartModel.find(req.params);
  res.send(result);
};

const placeOrder= async(req,res)=>{
  
}

module.exports = {
  addCart,
  updateCartProductQuantity,
  removeCartProduct,
  getAllProduct,
  addProduct,
  getUserCartProduct,
  getSpecificCartPro,
};
