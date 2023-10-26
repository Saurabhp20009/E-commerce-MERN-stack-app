const express = require("express");
const { userRouter } = require("./routes/userRoutes");
const app = express();
const cors= require("cors");
const { productRoutes } = require("./routes/productRoutes");
require('./Config/Connection')

app.use(express.json())
app.use(cors())
app.use("/user/api",userRouter)
app.use("/product/api",productRoutes)
app.listen(5000, () => {
  console.log("PORT IS RUNNING");
});
