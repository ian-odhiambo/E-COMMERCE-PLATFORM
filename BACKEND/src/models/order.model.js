import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        users: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "product",
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
                },
                price: {
                    type: Number,
                    required: true,
                    min: 0,
                },

            }
        ],
        totalAmount: {
            type: Number,
            required: true,
            min: 0,
        },
        sripeSessionId: {
            type: String,
            unique: true,
        }
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;