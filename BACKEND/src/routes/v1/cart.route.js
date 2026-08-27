import express from "express";
import { addToCart } from "../../controllers/cart.controller.js";
import { protectRoute } from "../../middleware/auth.middleware.js";

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);// this for updating quantity, either by increasing or decreasing it

export default router