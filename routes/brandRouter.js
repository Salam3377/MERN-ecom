const express = require('express')
import { createBrand, getAllBrands, getSingleBrand, updateBrand, deleteBrand } from "../controllers/brandController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";


const brandRouter = express.Router()

brandRouter.post('/', isLoggedIn, isAdmin, createBrand)
brandRouter.get('/', getAllBrands)
brandRouter.get('/:id', getSingleBrand)
brandRouter.put('/:id', isLoggedIn, isAdmin, updateBrand)
brandRouter.delete('/:id', isLoggedIn, isAdmin, deleteBrand)


export default brandRouter