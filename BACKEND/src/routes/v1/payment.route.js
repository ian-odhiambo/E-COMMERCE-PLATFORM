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
                quantity: product.quantity, 
            };
        });

        
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/cancel`,
            metadata: {
                userId: req.user._id.toString(),
                couponCode: couponCode || "",
            },
        });

        res.status(200).json({ sessionId: session.id, url: session.url });

    } catch (error) { 
        console.log("Error in create-checkout-session route", error.message);
        res.status(500).json({ error: error.message });
    }
});

export default router;