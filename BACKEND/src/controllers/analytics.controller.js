import User from '../models/user.model.js';
import Product from '../models/product.model.js'

export const getAnalyticsData = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
}