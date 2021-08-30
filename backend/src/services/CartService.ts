import { ICart } from './../interfaces/CartInterface';
import { IService } from './ServiceInterface';
import pick from '../util/Pick';
import {Request,Response,NextFunction} from 'express';
import cartRepository from '../repositories/CartRepository'

class CartService implements IService{
    private _cartRepository = cartRepository;
    defaultMethod(req:Request,res:Response,next:NextFunction){

    }

    addAndUpdateCart = async (req:Request,res:Response,next:NextFunction)=>{
        let cart = req.body;
        let cartFound = await this._cartRepository.findCart(cart)
        try {
            if(!cartFound){
                let cartAdded = await this._cartRepository.addCart(cart);
                if(cartAdded){
                    res.status(200).json({
                        success: true,
                        result: cartAdded,
                        error: null
                    });
                }
            }
            else{
                if(cartFound.amount==0){
                    let cartDeleted = await this._cartRepository.deleteCart(cart);
                    if(cartDeleted){
                        res.status(200).json({
                            success: true,
                            result: cartDeleted,
                            error: null
                        });
                    }
                }
                else{
                    let cartUpdated = await this._cartRepository.updateCart(cart);
                    if(cartUpdated){
                        res.status(200).json({
                            success: true,
                            result: cartUpdated,
                            error: null
                        });
                    }
                }

            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can not add to cart this time, please check again"
            });
        }
    }

    deleteCart = async (req:Request,res:Response,next:NextFunction)=>{
        let cartId = req.body.id;
        try {
            let cartFound = await this._cartRepository.findCartById(cartId);
            if(cartFound){
                let cartDeleted = this._cartRepository.deleteCart(cartFound);
                if(cartDeleted){
                    res.status(200).json({
                        success: true,
                        result: cartDeleted,
                        error: null
                    });
                }
            }
            else{
                res.status(500).json({
                    success: false,
                    result: null,
                    error: "Cart doesn't exist, please check again"
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can not delete cart this time, please check again"
            });
        }
    }

    getAllCart = async (req:Request,res:Response,next:NextFunction)=>{
        let userId = req.body.userId;
        try {
            let cartList: ICart[] = await this._cartRepository.getAllCart(userId);
            if(cartList.length>0){
                res.status(200).json({
                    success: true,
                    result: cartList,
                    error: null 
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can not get cart this time, please check again"
            });
        }
    }

}

export = new CartService();