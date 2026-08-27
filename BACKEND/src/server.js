import express from "express";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser'

import authRoutes from "./routes/v1/auth.route.js";
import productRoutes from "./routes/v1/product.route.js";
import cartRoutes from "./routes/v1/cart.route.js"
import couponRoutes from "./routes/v1/coupon.route.js"
import paymentRoutes from "./routes/v1/payment.route.js"

import { connectDB } from "./libs/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) //allow you to parse the body of the request
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/cart", cartRoutes);
app.use("/api/v1/coupons", couponRoutes);
app.use("/api/v1/pay", paymentRoutes)

app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);

  connectDB();
});

