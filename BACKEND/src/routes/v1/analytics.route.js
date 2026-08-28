import express from "express";
import { adminRoute, protectRoute } from "../../middleware/auth.middleware.js";
import {getAnalyticsData} from '../../controllers/analytics.controller.js';

const router = express.Router();

router.get("/",protectRoute, adminRoute, async(req, res) => {
    try{
        const analyticsData = await getAnalyticsData();

        const startDate = new Date();
        const endDate = newDate(endDate.getTime() + 24 * 60 * 60 * 1000); // Add one day to the end date
    }catch(error){

    }
})

export default router;