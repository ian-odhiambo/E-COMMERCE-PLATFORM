import User from "../models/user.model.js";
import bcrypt from "bcryptjs";  // ← Add this import

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