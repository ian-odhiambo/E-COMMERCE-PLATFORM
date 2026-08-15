import express from "express";

const router = express.Router();

router.get("/signup", signup)

router.get("/login", login)

router.get("/logout", login)

export default router;