import express from "express";
import { login, logout, signup } from "../../controllers/auth.controller.js";

const router = express.Router();

router.post("/api/v1/auth/signup", signup);
router.post("/api/v1/auth/login", login);
router.post("/api/v1/auth/logout", logout);

export default router;