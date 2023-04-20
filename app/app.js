import dotenv from 'dotenv'
dotenv.config()
import Stripe from 'stripe'
import express from 'express'
import dbConnect from '../config/dbConnect.js' //cannot find module add extension .js
import userRoutes from '../routes/userRoutes.js'
import { globalErrorHandler, notFound } from '../middlewares/globalErrorHandler.js'
import productsRouter from '../routes/productRouter.js'
import categoriesRouter from '../routes/categoryRouter.js'
import brandRouter from '../routes/brandRouter.js'
import colorRouter from '../routes/colorRouter.js'
import reviewRouter from '../routes/reviewRouter.js'
import orderRouter from '../routes/orderRouter.js'
import Order from '../model/Order.js'
import couponRouter from '../routes/couponRouter.js'




//db connect
dbConnect()

const app = express()


//stripe webhook

// //stripe instance
const stripe = new Stripe(process.env.STRIPE_KEY);

// The library needs to be configured with your account's secret key.
// Ensure the key is kept out of any version control system you might be using.
// const stripe = require('stripe')('sk_test_...');
// const express = require('express');


// This is your Stripe CLI webhook secret for testing your endpoint locally.
const endpointSecret = "whsec_0bcbea5759192bae8b19821e0f37873d5aa73c2e2871bf98228643c731ac0841";

app.post('/webhook', express.raw({type: 'application/json'}), async (request, response) => {
  const sig = request.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
  } catch (err) {
    response.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if(event.type === 'checkout.session.completed') {
    //update order
    const session = event.data.object
    const { orderId } = session.metadata
    const paymentStatus = session.payment_status
    const paymentMethod = session.payment_method_types[0]
    const totalAmount = session.amount_total
    const currency = session.currency

    const order = await Order.findByIdAndUpdate(JSON.parse(orderId), {
        totalPrice: totalAmount / 100,
        currency,paymentMethod, paymentStatus
    },{
        new: true,
    })
  } else {
    return 
  }
  // Handle the event
//   switch (event.type) {
//     case 'payment_intent.succeeded':
//       const paymentIntentSucceeded = event.data.object;
//       // Then define and call a function to handle the event payment_intent.succeeded
//       break;
//     // ... handle other event types
//     default:
//       console.log(`Unhandled event type ${event.type}`);
//   }

  // Return a 200 response to acknowledge receipt of the event
  response.send();
});
//insert stripe webhook before app.use

app.use(express.json())

app.use('/api/v1/users/', userRoutes)
app.use('/api/v1/products/', productsRouter)
app.use('/api/v1/categories/', categoriesRouter)
app.use('/api/v1/brands/', brandRouter)
app.use('/api/v1/colors/', colorRouter)
app.use('/api/v1/reviews/', reviewRouter)
app.use('/api/v1/orders/', orderRouter)
app.use('/api/v1/coupons/', couponRouter)


//middleware
app.use(notFound)
app.use(globalErrorHandler)

export default app