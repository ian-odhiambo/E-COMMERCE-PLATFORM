import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    password:{
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
        enum: ["customer","admin"],
        default: "customer"
    }
},{
    timestamps: true,
}
);


//Pre-save hook to hash password beore saving to database
//I had to hash the presave hook and call it in the signup controller because it causing the "next function error"
//So I decided to remove the calling the next function code entirely too
// userSchema.pre("save", function(next) {
//     if (!this.isModified("password")) return next();
    
//     const user = this;
//     bcrypt.genSalt(10, function(err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });

userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;