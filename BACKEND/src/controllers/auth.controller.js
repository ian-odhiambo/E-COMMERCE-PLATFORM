import { redis } from '../libs/redis.js'
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtokens";

//This is the piece of code responsible for the generation of access and refresh tokens for user authentication. The `generateTokens` function takes a user ID as input and creates a JWT access token that expires in 15 minutes and a refresh token that expires in 7 days. The `storeRefreshToken` function saves the refresh token in Redis with an expiration time of 7 days, allowing for secure token management and user session handling.
const generateTokens = (userId) => {
    const accessToken = jwt.sign({ id: userId }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' });
    const refreshToken = jwt.sign({ id: userId }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
    return { accessToken, refreshToken };
};

const storeRefreshToken = async(userId, refreshToken) => {
    await redis.set(`refresh_token:${userId}`, refreshToken, { EX: 7 * 24 * 60 * 60 }); // Set expiration to 7 days
}
 const setCookies = (res, accessToken, refreshToken) =>{
    res.cookie("accessToken", accessToken, {
        httpOnly: true, // this is responsible for preventing XSS attacks
    })
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
        await storeRefreshToken(user._id,refreshToken);

        setCookies(res, accessToken, refreshToken);

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