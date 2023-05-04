// const express = require('express')
import express from 'express'
import { createProductController, deleteProduct, getProductsController, getSingleProduct, updateProduct } from "../controllers/productController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import upload from "../config/fileUpload.js";
import isAdmin from "../middlewares/isAdmin.js";






const productsRouter = express.Router();

productsRouter.post('/', isLoggedIn, isAdmin, upload.array('files'), createProductController);
productsRouter.get('/', getProductsController);
productsRouter.get('/:id', getSingleProduct);
productsRouter.put('/:id', isLoggedIn, isAdmin, updateProduct);
productsRouter.delete('/:id', isLoggedIn, isAdmin, deleteProduct);


export default productsRouter;