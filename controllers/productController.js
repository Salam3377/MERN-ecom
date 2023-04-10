import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";



export const createProductController = expressAsyncHandler(async(req,res) => {
    const { name, description, category, sizes, colors, user, price, totalQty, brand } =req.body
    const productExists = await Product.findOne({ name })
    if(productExists) {
        throw new Error("Product already exists!")
    }
    const product = await Product.create({
        name,
        brand,
        description, 
        category, 
        sizes, 
        colors, 
        user: req.userAuthId, 
        price, 
        totalQty
    })

    //send response
    res.json({
        status: 'success',
        message: 'Product created successfully',
        product,
    })
})

export const getProductsController = expressAsyncHandler(async(req,res) => {
    const products = await Product.find()
    res.json({
        status: 'success',
        products
    })
})