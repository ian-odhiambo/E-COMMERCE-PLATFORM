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
        if(featuredProducts) {
            res.json(JSON.parse(featured_products))
        }

        //if not in redis, fetch it from mongodb
        featuredProducts = await Product.find({isFeatured: true}).lean();
        
        if(!featuredProducts) {
            return res.status(404).json({ message: "No featured products found" });
        }

        //store in redis for future quick access

        await redis.set("featured_products", JSON.stringify(featuredproducts));
        res.json(featuredProducts);
    }catch(error){
        console.log("Error in the getFeaturedProducts controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}