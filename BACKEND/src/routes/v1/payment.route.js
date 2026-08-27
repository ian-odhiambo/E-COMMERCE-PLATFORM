import express from "express";
import { protectRoute } from "../../middleware/auth.middleware.js";
import { createCheckoutSession } from '../controllers/payment.controller.js';


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
        }
    }catch(error){

    }
});
   


export default router;