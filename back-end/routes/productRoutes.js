const express=require('express')
const { cart, addCart, updateCartProductQuantity, removeCartProduct, getAllProduct, addProduct, getUserCartProduct, getSpecificCartPro } = require('../Controller/productController')
const productRoutes=express.Router()

productRoutes.use('/addCart/:userId',addCart)
productRoutes.use('/updateCart',updateCartProductQuantity)
productRoutes.use('/deleteCart/:_id',removeCartProduct)
productRoutes.get('/getProduct',getAllProduct)
productRoutes.post('/addProduct',addProduct)
productRoutes.get('/getUserCartPro/:userId',getUserCartProduct)
productRoutes.get('/getSpecificCartPro/:_id',getSpecificCartPro)


module.exports={productRoutes}