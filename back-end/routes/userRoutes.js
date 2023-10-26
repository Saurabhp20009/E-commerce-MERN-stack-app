const express= require('express')
const { Signup, Login, cartProductCheck } = require('../Controller/userController')
const app= express()
const userRouter= express.Router()

userRouter.post("/signup",Signup)
userRouter.post("/login",Login)
userRouter.post("/cartCheck/:userId",cartProductCheck)
// userRouter.post("/signup")
// userRouter.post("/signup")

module.exports={userRouter}