import User from '../models/user.model.js';
import Product from '../models/product.model.js'

export const getAnalyticsData = async (req, res) => {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();
    const salesData = await Order.aggregate([
        {
            $group: {
                _id:null,
                totalSales: {$sum:1},
                totalRevenue: {$sum:"$totalAmount"}
            }
        }
    ])

    const {totalSales, totalRevenue} = salesData[0] || {totalSales:0, totalRevenue:0};

    return {
        users:totalUsers,
        products:totalProducts,
        totalSales,
        totalRevenue
    }
};

export const getDailySalesData = async(startDate, endDate) => {
    const dailySalesData = await Order.aggregate([
        {
            $match: {
                createdAt: {
                    $gte: startDate,
                    $Ite: endDate,
                },
            },
        },
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                sales: { $sum: 1 },
                revenue: { $sum: "$totalAmount" },
            },
        },
        { $sort: {_id: 1} },

    ]);

    //example of dailySalesData

//     [
//         {
//         _id: "2026-08-18",
//         sales: 12,
//         revenue: 1450.75
//         },
//         {
//         _id: "2026-08-19",
//         sales: 2,
//         revenue: 1450.75
//         },
//         {
//         _id: "2026-08-20",
//         sales: 12,
//         revenue: 140.75
//         },
// ]

const dateArray = getDatesInRange(startDate, endDate);
// console.log(dateArray) //dates dating up to today
}

function getDatesInRange(startDate, endDate) {
    const dates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        dates.push(currentDate.toISOstring().split("T")[0]);
        currentDate.setDate(currentDate.getDate() + 1)
    }
}