import User from '../models/user.model.js';

export const getAnalyticsData = async (req, res) => {
    const totalUsers = await User.countDocuments();
}