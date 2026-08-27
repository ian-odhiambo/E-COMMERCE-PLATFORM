import Coupon from "../models/coupon.model.js"

export const getCoupon = async (req, res) => {
    try{
        const coupon = await Coupon.findOne({userId:req.user._id, isActive:true});
        res.json(coupon || null);
    }catch(error){
        console.log("Error in getCoupon", error.message);
        res.status(500).json({ message: "Server error", error: error.message }):
    }
} ;

export const validateCoupon = async (req, res) => {
    try{
        const {code} = req.body;
        const coupon = await Coupon.findOne({code, isActive:true});
    }catch(error){

    }
}