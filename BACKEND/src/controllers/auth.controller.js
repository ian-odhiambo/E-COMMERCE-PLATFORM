import User from "../models/user.model.js";

export const signup = async(req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({email});

    if(userExists) {
        return res.status(400).json({message: "user already exists"});
    }
    const user = await user.create({name, email, password})
}
export const login = async(req, res) => {
    res.send("login route called");
}

export const logout = async(req, res) => {
    res.send("logout route called");
}

