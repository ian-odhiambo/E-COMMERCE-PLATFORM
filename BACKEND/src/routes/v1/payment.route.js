import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { createCheckoutSession } from '../controllers/payment.controller.js';
import Stripe from 'stripe'; 

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY); 

router.post("/create-checkout-session", protectRoute, async (req, res) => {
    try {
        const { products, couponCode } = req.body; 

        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" });
        }

        let totalAmount = 0;

        const lineItems = products.map(product => { 
            const amount = Math.round(product.price * 100); // Stripe wants cents
            totalAmount += amount * product.quantity;

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: product.name,
                        images: [product.image],
                    },
                    unit_amount: amount,
                }, 
            };
        });
        let coupon = null;
        if(couponCode) {
            coupon = await Coupon.findOne({ code:couponCode,userId:req.user._id,isActive:true });
            if(coupon) {
                totalAmount = Math.round(totalAmount *  coupon.discountPercentage / 100);
            }
        }

export default router;