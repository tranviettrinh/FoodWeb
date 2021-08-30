import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authen = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let token = req.headers.authorization.split(" ")[1];
        let decoded = await jwt.verify(token, process.env.JWT_KEY);
        req.currentUser = decoded;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            result: null,
            error: "Login is required to do this action" 
        });
    }
}