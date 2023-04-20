import express from "express";
import { createOrder, getAllOrders, getOrderStats, getSingleOrder, updateOrder } from "../controllers/orderController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const orderRouter = express.Router();


orderRouter.post("/", isLoggedIn, createOrder);
orderRouter.get("/", isLoggedIn, getAllOrders);
orderRouter.get('/sales/stats', isLoggedIn, getOrderStats)
orderRouter.get("/:id", isLoggedIn, getSingleOrder);
orderRouter.put("/update/:id", isLoggedIn, updateOrder);





export default orderRouter;
