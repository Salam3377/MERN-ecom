// const express = require('express')
import express from 'express'
import { createCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory } from "../controllers/categoryController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import catetgoryFileUpload from "../config/categoryUpload.js";



const categoriesRouter = express.Router()

categoriesRouter.post('/', isLoggedIn, catetgoryFileUpload.single('file'), createCategory)
categoriesRouter.get('/', getAllCategories)
categoriesRouter.get('/:id', getSingleCategory)
categoriesRouter.put('/:id', isLoggedIn, updateCategory)
categoriesRouter.delete('/:id', isLoggedIn, deleteCategory)


export default categoriesRouter