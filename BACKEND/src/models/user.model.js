import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Name is required"]
    },
    email:{
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true
    },
    pasword:{
        type: String,
        required: [true, "password is required"],
        minlength: [6, "password must be at least 6 characters long"]
    },
    cartItems:[
        {
            quantity:{
                type: Number,
                default: 1
            },
            product:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"product"
            }
        }
    ],
    role:{
        type: String,
        enum: ["user","admin"],
        default: "customer"
    }
},{
    timestamps: true,
}
);

const User = mongoose.model("User", userSchema)

export default User
