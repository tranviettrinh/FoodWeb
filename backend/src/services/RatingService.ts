import { IRating } from "../interfaces/RatingInterface";
import { IService } from './ServiceInterface';
import {Request,Response,NextFunction} from 'express';
import ratingRepository from '../repositories/RatingRepository';

class RatingService implements IService{
    private _ratingRepository = ratingRepository;

    defaultMethod(req:Request,res:Response,next:NextFunction){

    }

    addAndUpdateRating = async (req:Request,res:Response,next:NextFunction)=>{
        let rating = req.body;
        try {
            let ratingFound:boolean = await this._ratingRepository.findRating(rating);
            if(!ratingFound){
                let productRated = await this._ratingRepository.rateProduct(rating);
                if(productRated){
                    res.status(200).json({
                        success: true,
                        result: productRated,
                        error: null 
                    });
                }
                else{
                    res.status(500).json({
                        success: false,
                        result: null,
                        error: "Can't rate product this time, please check later" 
                    });
                }
            }
            else{
                let ratingUpdated = await this._ratingRepository.updateRating(rating);
                if (ratingUpdated) {
                    res.status(200).json({
                        success: true,
                        result: ratingUpdated,
                        error: null 
                    });
                } else {
                    res.status(500).json({
                        success: false,
                        result: null,
                        error: "Can't update rating for this product this time, please check later" 
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can't update rating for this product this time, please check later" 
            });
        }
    }

    getRatingAverage = async (req:Request,res:Response,next:NextFunction)=>{
        let productId = req.body.productId;
        try {
            let ratingAverage = await this._ratingRepository.getRatingAverage(productId);
            res.status(200).json({
                success: true,
                result: ratingAverage,
                error: null 
            });
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can't get rating for this product this time, please check later" 
            });
        }
    }

    getAllRating = async (req:Request,res:Response,next:NextFunction)=>{
        let productId = req.body.productId;
        try {
            let ratingList: IRating[] = await this._ratingRepository.getAllRating(productId);
            if(ratingList){
                res.status(200).json({
                    success: true,
                    result: ratingList,
                    error: null 
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can't get rating for this product this time, please check later" 
            });
        }
    }

    filterRatingByPoint = async (req:Request,res:Response,next:NextFunction)=>{
        let productId = req.body.productId;
        let ratingPoint = req.body.ratingPoint;
        try {
            let ratingList: IRating[] = await this._ratingRepository.filterRating(productId, ratingPoint);
            if(ratingList){
                res.status(200).json({
                    success: true,
                    result: ratingList,
                    error: null 
                });
            }
        } catch (error) {
            res.status(500).json({
                success: false,
                result: null,
                error: "Can't get rating for this product this time, please check later" 
            });
        }
    }
}

export = new RatingService();