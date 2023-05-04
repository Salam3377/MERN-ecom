import express from 'express'
//const express = require('express')
import { createReview } from "../controllers/reviewController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

const reviewRouter = express.Router();

reviewRouter.post("/:productID", isLoggedIn, createReview);

export default reviewRouter;