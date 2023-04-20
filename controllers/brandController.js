import expressAsyncHandler from "express-async-handler";
import Brand from "../model/Brand.js";

//CREATE
export const createBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  //brand exists
  const brandFound = await Brand.findOne({ name });
    
  if(brandFound) {
    throw new Error("Brand already exists");
  }

  const brand = await Brand.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "Brand created successfully",
    brand,
  });
});


//GET ALL
export const getAllBrands = expressAsyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.json({
    status: "success",
    message: "Brands fetched successfully",
    brands,
  });
});

//GET SINGLE
export const getSingleBrand = expressAsyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  res.json({
    status: "success",
    message: "brand fetched successfully",
    brand,
  });
});

//UPDATE
export const updateBrand = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  const brand = await Brand.findByIdAndUpdate(
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
    message: "brand updated successfully",
    brand,
  });
});

//DELETE
export const deleteBrand = expressAsyncHandler(async (req, res) => {
  await Brand.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "brand deleted successfully",
  });
});