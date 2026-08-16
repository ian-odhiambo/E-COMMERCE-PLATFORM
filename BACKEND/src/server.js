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

//my database connection string
//mongodb+srv://theniloticdecor_db_user:cFu7Vow3ZDozPLCN@cluster0.qvt3x8z.mongodb.net/?appName=Cluster0
