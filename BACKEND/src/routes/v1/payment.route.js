import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { createCheckoutSession } from '../controllers/payment.controller.js';
import { stripe } from "../../libs/stripe.js";
import Coupon from "../../models/coupon.model.js";
import Order from "../../models/order.model.js"


const router = express.Router();


router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/checkout-success", protectRoute, async (req, res) =>{
    try{
        const { sessionId } = req.body;
        const session = await stripe.checkout.session.retrieve(sessionId);

        if(session.payment_status === "paid") {
            if(session.metadata.couponCode) {
                await Coupon.findOneAndUpdate({
                    code: session.metadata.couponCode, userId:session.metadata.userId
                }, {
                    isActive:false
                })
            }

            //create a new order
            const products = JSON.parse(session.metadata.products);
            const newOrder = new Order({
                userId: session.metadata.userId,
                products: product.map(product =>({
                    quantity: product.quantity,
                    price: product.price,
                })),
                totalAmount: session.amount_total / 100, //convert from cents to dollars,
                paymentIntent:session.payment_intent,
                stripeSessionId: session.id
                
            });
            await newOrder.save();
            res.status(200).json({
                success: true,
                message: "Payment successful, order created, and coupon deactivated if used.",
                orderId: newOrder._id,
            })
        }
    }catch(error){

    }
});
   


export default router;