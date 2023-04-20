import expressAsyncHandler from "express-async-handler";
import Category from "../model/Category.js";


//CREATE
export const createCategory = expressAsyncHandler(async(req,res)=> {
    const { name } = req.body
    //if category exists
    const categoryFound = await Category.findOne({name})
    if(categoryFound) {
        throw new Error('Category already exists')
    }

    //create
    const category = await Category.create({
        name: name.toLowerCase(),
        user: req.userAuthId,
        image: req.file.path,
    })

    res.json({
        status: 'success',
        message: 'category created successfully',
        category,
    })
})

//GET
export const getAllCategories = expressAsyncHandler(async(req,res)=> {
    const categories = await Category.find()

    res.json({
        status: 'success',
        message: 'categories fetched successfully',
        categories,
    })
})

//GET ONE
export const getSingleCategory = expressAsyncHandler(async(req,res)=> {
    const category = await Category.findById(req.params.id)

    res.json({
        status: 'success',
        message: 'category fetched successfully',
        category,
    })
})

//UPDATE
export const updateCategory = expressAsyncHandler(async(req,res)=> {
    const { name } = req.body;
    
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        name,
      },
      {
        new: true,
      }
    );
    res.json({
      status: "success",
      message: "category updated successfully",
      category,
    });
  });
  
 //DELETE
  export const deleteCategory = expressAsyncHandler(async (req, res) => {
    await Category.findByIdAndDelete(req.params.id);
    res.json({
      status: "success",
      message: "Category deleted successfully",
    });
  });