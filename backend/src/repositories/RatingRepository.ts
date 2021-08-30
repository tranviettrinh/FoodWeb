import { IRating } from './../interfaces/RatingInterface';
import { Rating } from "../model/RatingModel";
import { Types } from 'mongoose';

class RatingRepository{

    async findRating(rating:IRating):Promise<boolean>{
        try {
            let result = false;
            let ratingFound:IRating = await Rating.findOne({userId:rating.userId, productId:rating.productId});
            if(ratingFound){
                result = true;
            }
            return result;
        } catch (error) {
            throw new Error(error);
        }
    } 

    async rateProduct(rating:IRating):Promise<IRating>{
        try {
            let rated = new Rating({
                _id: Types.ObjectId,
                ...rating
            })
            await rated.save();
            return rated;
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateRating(rating:IRating):Promise<IRating>{
        try {
            await Rating.updateOne({userId:rating.userId, productId:rating.productId},{...rating});
            return Rating.findOne({userId:rating.userId, productId: rating.productId});
        } catch (error) {
            throw new Error(error);
        }
    }

    async getAllRating(productId:number):Promise<IRating[]>{
        try {
            let ratingList: IRating[] = await Rating.find({
                productId:productId
            });
            return ratingList;
        } catch (error) {
            throw new Error(error);
        }
    }

    async getRatingAverage(productId:number):Promise<number>{
        try {
            let rating:number = 0;
            let ratingList: IRating[] = Rating.find({
                productId:productId
            });
            for (var i =0; i<ratingList.length;i++){
                rating = rating+ratingList[i].ratingPoint;
            }
            rating = rating/ratingList.length;
            return rating;
        } catch (error) {
            throw new Error(error);
        }
    }

    async filterRating(productId:number, ratingPoint:number):Promise<IRating[]>{
        try {
            let filterList: IRating[] = await Rating.find({productId:productId,ratingPoint:ratingPoint});
            return filterList;
        } catch (error) {
            throw new Error(error);
        }
    }

}

export = new RatingRepository();