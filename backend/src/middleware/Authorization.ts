import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const author = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        let currentUser = req.currentUser;
        if(currentUser.role==1){
            next();
        }
        else{
            res.status(400).json({
                success: false,
                result: null,
                error: "this role is not allow to do this action" 
            });
        }
    } catch (error) {
        res.status(400).json({
            success: false,
            result: null,
            error: "this role is not allow to do this action" 
        });
    }
}