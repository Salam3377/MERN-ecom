const express = require('express')
import { createColor, getAllColors, getSingleColor, updateColor, deleteColor } from "../controllers/ColorController.js";

import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";
const colorRouter = express.Router();


colorRouter.post("/", isLoggedIn, isAdmin, createColor);
colorRouter.get("/", getAllColors);
colorRouter.get("/:id", getSingleColor);
colorRouter.put("/:id", isLoggedIn, isAdmin, updateColor);
colorRouter.delete("/:id", isLoggedIn, isAdmin, deleteColor);


export default colorRouter;
