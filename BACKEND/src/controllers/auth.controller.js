import { redis } from '../libs/redis.js'
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
        httpOnly: true, // this is responsible for preventing XSS attacks, cross site scripting attacks
        secure: process.env.NODE_ENV === "production", // this is responsible for ensuring that the cookie is only sent over HTTPS in production
        sameSite:"strict", // prevents CSRF attacks and cross-site request forgery
        maxAge: 15 * 60 * 1000//15 minutes 
    })
    res.cookie("refreshToken", refreshToken, {
        httpOnly: true, // this is responsible for preventing XSS attacks, cross site scripting attacks
        secure: process.env.NODE_ENV === "production", // this is responsible for ensuring that the cookie is only sent over HTTPS in production
        sameSite:"strict", // prevents CSRF attacks and cross-site request forgery
        maxAge: 7 * 24 * 60 * 60 * 1000,//7 days
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

        res.status(201).json( {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        })
    } catch(error) {
        console.log("Error in signup controller", error.message)
        res.status(500).json({ message: error.message})
    }
};

export const login = async(req, res) => {
    try{
        const {email, password} = req.body
        const user = await User.findOne({email})

        if(user && (await user.comparePassword(password))) {
            const {accessToken, refreshToken} = generateTokens(user._id)

            await storeRefreshToken(user._id,refreshToken)
            setCookies(res,accessToken,refreshToken)

            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            });
        }
    }catch(error){
        console.log("Error in login controller")
        res.status(500).json({ message: error.message})
    }
};

export const logout = async(req, res) => {
    try{
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            await redis.del(`refresh_token:${decoded.userId}`)
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({ message: "Logged out successfully"})
    }catch(error){
        res.status(500).json({ message:"server error", error: error.message})
    }
};