import exppress from "express";
import { createProductController, getProductsController } from "../controllers/productController.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";


const productsRouter = exppress.Router();

productsRouter.post('/', isLoggedIn, createProductController);
productsRouter.get('/', isLoggedIn, getProductsController);


export default productsRouter;