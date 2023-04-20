import expressAsyncHandler from "express-async-handler";
import Product from "../model/Product.js";
import Category from "../model/Category.js";
import Brand from "../model/Brand.js";



export const createProductController = expressAsyncHandler(async(req,res) => {
    console.log(req.files)
    const { name, description, category, sizes, colors, price, totalQty, brand } =req.body
    const convertedImgs = req.files.map((file) => file?.path);

    const productExists = await Product.findOne({ name })
    if(productExists) {
        throw new Error("Product already exists!")
    }
    //find cateory
    const categoryFound = await Category.findOne({
        name: category,
    })
    if(!categoryFound) {
        throw new Error(
            "Category not found, please create category first or check category name"
          )
    }

   
    //find brand
    const brandFound = await Brand.findOne({
        name: brand?.toLowerCase(),
    })
    if(!brandFound) {
        throw new Error(
            "Brand not found, please create Brand first or check category name"
          )
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
        totalQty,
        images: convertedImgs,
    })
    //push product into CATEGORY
    categoryFound.products.push(product._id)
    //save
    await categoryFound.save()

    //push product into BRAND
    brandFound.products.push(product._id)
    //save
    await brandFound.save()

    //send response
    res.json({
        status: 'success',
        message: 'Product created successfully',
        product,
    })
})

export const getProductsController = expressAsyncHandler(async(req,res) => {
    //product query
    let productQuery = Product.find()

    //find by name
    if(req.query.name) {
        productQuery = productQuery.find({
            name: {$regex: req.query.name, $options: "i"}
        })
    }

     //find by brand
     if(req.query.brand) {
        productQuery = productQuery.find({
            brand: {$regex: req.query.brand, $options: "i"}
        })
    }

    //find by category
    if(req.query.category) {
        productQuery = productQuery.find({
            category: {$regex: req.query.category, $options: "i"}
        })
    }

    //find by color
    if(req.query.color) {
        productQuery = productQuery.find({
            colors: {$regex: req.query.color, $options: "i"}
        })
    }

    //find by size
    if(req.query.size) {
        productQuery = productQuery.find({
            sizes: {$regex: req.query.size, $options: "i"}
        })
    }

    //find by price range
    if(req.query.price) {
        const priceRange = req.query.price.split('-')
        productQuery = productQuery.find({
            price: {$gte: priceRange[0], $lte: priceRange[1]}
        })
    }

    //pagination
    //page
    const page = parseInt(req.query.page) ? parseInt(req.query.page) : 1
    //limit
    const limit = parseInt(req.query.limit) ? parseInt(req.query.limit) : 10
    //startIndex
    const startIndex = (page -1) * limit
    //endIndex
    const endIndex = page * limit
    //total
    const total = await Product.countDocuments()

    productQuery = productQuery.skip(startIndex).limit(limit)

    //pagination results
    const pagination = {}
    if(endIndex < total) {
        pagination.next = {
            page: page +1,
            limit,
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page -1,
            limit,
        }
    }

    const products = await productQuery.populate('reviews')

    res.json({
        status: 'success',
        total,
        results: products.length,
        pagination,
        message: "Products fetched successfully",
        products,
    })
})


//get single product
export const getSingleProduct = expressAsyncHandler(async(req,res) => {
    const product = await Product.findById(req.params.id)
    if(!product) {
        throw new Error('Product not found')
    } 
    res.json({
        status: 'success',
        message: 'Product fetched successfully',
        product,
    })
})

//update
export const updateProduct = expressAsyncHandler(async(req,res) => {
    const { name, description, category, sizes, colors, user, price, totalQty, brand } =req.body

    //update
    const product = await Product.findByIdAndUpdate(req.params.id, {
        name, description, category, sizes, colors, user, price, totalQty, brand
    },
    {
        new: true,
    })
    res.json({
        status: 'success',
        message: 'Product updated successfully',
        product,
    })
})


//delete product
export const deleteProduct = expressAsyncHandler(async(req,res) => {
    await Product.findByIdAndDelete(req.params.id)
    
    res.json({
        status: 'success',
        message: 'Product deleted successfully',
    })
})