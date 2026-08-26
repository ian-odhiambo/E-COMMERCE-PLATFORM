import Product from '../models/product.model.js'; 

export const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find({});// This is for find all products
        res.json({ products });
    }catch(error){
        console.log("Error in the gegtAllProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getFeaturedProducts = async (req, res) => {
    try{
        let featuredProducts = await redis.get("featured_products")
    }catch(error){

    }
}