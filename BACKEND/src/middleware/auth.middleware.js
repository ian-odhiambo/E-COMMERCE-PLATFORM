import jwt from "jsonwebtoken"; 
export const protectRoute = (req, res, next) => {
    try{
        const accessToken = req.cookies.accessToken;

        if(!accessToken){
            return res.status(401).json({message: "Unauthorised - No access token provided"})
        }
        // Verify the access token here (e.g., using JWT)
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

    }catch(error){

    }
}