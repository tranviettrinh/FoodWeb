import { Request, Response, NextFunction } from 'express';
import pick from '../util/Pick';
import Joi from 'joi';
export const validate = (schema)=>(req:Request,res:Response,next:NextFunction)=>{
    const validSchema = pick(schema,['params','query','body']);
    const object = pick(req,Object.keys(validSchema));
    const {value, error} = Joi.compile(validSchema).prefs({
        errors : {label : 'key'},
        abortEarly : false
     }).validate(object);

     if(error){
         const message = error.details.map((details)=>details.message).join(',');
         console.log(message);
         return res.status(400).json({message, success:false});
     }
     Object.assign(req, value);
     next();

}