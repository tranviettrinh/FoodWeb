import { IService } from './ServiceInterface';
import {Request, Response, NextFunction} from 'express';
import userRepository from '../repositories/UserRepository';
import pick from '../util/Pick';
import jwt from 'jsonwebtoken';
class UserService implements IService{
    private _userRepository = userRepository;

    defaultMethod(req:Request,res:Response,next:NextFunction){

    }

    createUser = async (req:Request,res:Response,next:NextFunction)=>{
        let user = req.body;
        try {
            let userFound = await this._userRepository.findUserbyName(user.username);
            if(!userFound){
               let userCreated = await this._userRepository.createUser(user);
               userCreated = pick(userCreated,['name', 'username','role','dob','address']);  
               res.status(200).json({
                    success: true,
                    result: userCreated,
                    error: null
                });
            }
            else{
                res.status(500).json({
                    success: false,
                    result: null,
                    error: 'Account Existed' 
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error 
            })
        }
    }

    updateUser = async (req:Request,res:Response,next:NextFunction)=>{
        let user = req.body;
        try {
            let userUpdated = await this._userRepository.updateUser(user);
            if(userUpdated){
                res.status(200).json({
                    success: true,
                    result: userUpdated,
                    error: null 
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can't update user this time, please check later" 
            })
        }
    }

    loginUser = async (req:Request,res:Response,next:NextFunction)=>{
        let user = req.body;
        try {
            let userFound = await this._userRepository.findUserbyName(user.username);
            if(userFound){
                let userLogged = await this._userRepository.loginUser(user.username,user.password);
                if(userLogged){
                    let accessToken = jwt.sign(
                        {id: userLogged.id, role: userLogged.role},
                        process.env.JWT_KEY, 
                        {expiresIn: '5h'}
                    );

                    res.status(200).json({
                        success: true,
                        result: {accessToken},
                        error: null
                    });
                }
                else{
                    res.status(500).json({
                        success: false,
                        result: null,
                        error: 'Wrong password'
                    })
                }
            }
            else{
                res.status(500).json({
                    success: false,
                    result: null,
                    error: 'Wrong username'
                })
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can't login this time, please check later" 
            })
        }
    }
    
}

export = new UserService();