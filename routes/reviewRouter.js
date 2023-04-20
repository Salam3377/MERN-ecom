import exppress from "express";
import { createReview } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRouter = exppress.Router();

reviewRouter.post("/:productID", isLoggedIn, createReview);

export default reviewRouter;