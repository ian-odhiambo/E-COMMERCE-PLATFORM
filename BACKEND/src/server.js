import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/v1/auth.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);
});

