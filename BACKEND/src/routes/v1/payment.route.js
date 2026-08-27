import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { createCheckoutSession } from '../controllers/payment.controller.js';

const router = express.Router();

router.post("/create-checkout-session", protectRoute, async (req,res) =>{
    try{
        const {product,couponCode} = req.body;

        if (!Array.isArray(products)  || products.length === 0) {
            return res.status(400).json({ error: "Invalid or empty products array" })

            let totalAmount = 0;

            const lineItems = products.map(products => {
                const amount = Math.round(product.price * 100) // stripes wants to send you the amount in cents
                totalAmount += amount * product.quantity

                return {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name:product.name,
                            images:[product.image],
                        } 
                    }
                }
            })
        }
    }catch(error){

    }
})

export default router;