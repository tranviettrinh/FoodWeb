import {Request,Response,NextFunction} from 'express'
export interface IService{
    defaultMethod(req:Request,res:Response,next:NextFunction);
}