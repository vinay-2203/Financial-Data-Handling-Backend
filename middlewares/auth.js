import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();


export const authorization = async (req, res, next) => {
    
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            return res.status(401).json({ message: "You are not logged in!" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Your are not loggedIn!" })
        }

        const verifytoken = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.user = verifytoken

        next();
    }
    catch (err) {
        return res.status(400).json({ message: 'Error', error: err })
    } 
}