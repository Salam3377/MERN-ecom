import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import dbConnect from '../config/dbConnect.js' //cannot find module add extension .js
import userRoutes from '../routes/userRoutes.js'
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js'
import productsRouter from '../routes/productRoutes.js'

//db connect
dbConnect()

const app = express()

app.use(express.json())

app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/products/', productsRouter)


//middleware
app.use(notFound)
app.use(globalErrorHandler)

export default app