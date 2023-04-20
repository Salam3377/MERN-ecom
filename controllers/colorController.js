import expressAsyncHandler from "express-async-handler";
import Color from "../model/Color.js";

//CREATE
export const createColor = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  //color exists
  const colorFound = await Color.findOne({ name });
  if (colorFound) {
    throw new Error("color already exists");
  }
  //create
  const color = await Color.create({
    name: name.toLowerCase(),
    user: req.userAuthId,
  });

  res.json({
    status: "success",
    message: "color created successfully",
    color,
  });
});

//GET ALL
export const getAllColors = expressAsyncHandler(async (req, res) => {
  const colors = await Color.find();
  res.json({
    status: "success",
    message: "colors fetched successfully",
    colors,
  });
});

//GET SINGLE
export const getSingleColor = expressAsyncHandler(async (req, res) => {
  const color = await Color.findById(req.params.id);
  res.json({
    status: "success",
    message: "color fetched successfully",
    color,
  });
});

//UPDATE
export const updateColor = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;

  //update
  const color = await Color.findByIdAndUpdate(
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
    message: "color updated successfully",
    color,
  });
});

//DELETE
export const deleteColor = expressAsyncHandler(async (req, res) => {
  await Color.findByIdAndDelete(req.params.id);
  res.json({
    status: "success",
    message: "color deleted successfully",
  });
});