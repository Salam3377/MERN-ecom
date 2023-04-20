import express from "express";
import { createCoupon, getAllCoupons, getCoupon, updateCoupon,deleteCoupon } from "../controllers/couponController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";
import isAdmin from "../middlewares/isAdmin.js";


const couponRouter = express.Router();


couponRouter.post("/", isLoggedIn, isAdmin, createCoupon);
couponRouter.get("/", getAllCoupons);
couponRouter.get("/:id", getCoupon);
couponRouter.put("/update/:id", isLoggedIn, isAdmin, updateCoupon);
couponRouter.delete("/delete/:id", isLoggedIn, isAdmin, deleteCoupon);




export default couponRouter;
