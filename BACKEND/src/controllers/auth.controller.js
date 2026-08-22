import { redis } from '../libs/redis.js'
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtokens";

const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const storeRefreshToken = async(userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, { EX: 7 * 24 * 60 * 60 }); // Set expiration to 7 days
}
export const signup = async(req, res) => {  
    const { name, email, password } = req.body;
    try{
        const userExists = await User.findOne({email});

        if(userExists) {
            return res.status(400).json({message: "user already exists"});
        }

        // Hash password manually in the controller
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create user with hashed password
        const user = await User.create({
            name, 
            email, 
            password: hashedPassword  // ← Use hashed password
        });

        //authenticate
        const{ accessToken, refreshToken } = generateTokens(user._id)
        await storeRefreshToken(user._id,refreshToken)

        res.status(201).json({user, message: "User created successfully"})
    } catch(error) {
        res.status(500).json({ message: error.message})
    }
};

export const login = async(req, res) => {
    res.send("login route called");
};

export const logout = async(req, res) => {
    res.send("logout route called");
};