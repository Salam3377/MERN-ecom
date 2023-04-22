const express = require('express')
import { registerUserController, loginUserController, getUserProfileController, updateShippingAddress } from "../controllers/userController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const userRoutes = express.Router()

userRoutes.post('/register', registerUserController)
userRoutes.post('/login', loginUserController)
userRoutes.get('/profile', isLoggedIn, getUserProfileController)
userRoutes.put('/update/shipping', isLoggedIn, updateShippingAddress)

export default userRoutes