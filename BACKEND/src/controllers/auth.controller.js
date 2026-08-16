import User from "../models/user.model.js";

export const signup = async(req, res) => {
    const { name, email, password } = req.body;
    res.send("sign up route called");
}
export const login = async(req, res) => {
    res.send("login route called");
}

export const logout = async(req, res) => {
    res.send("logout route called");
}

