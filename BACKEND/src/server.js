import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/v1/auth.route.js";
import { connectDB } from "./libs/db.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()) //allow you to parse the body of the request

app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  console.log("server is running on http://localhost:" + PORT);

  connectDB();
});

