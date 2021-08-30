import { IRating } from './../interfaces/RatingInterface';
import { model,Schema,Types } from 'mongoose';

const ratingSchema: Schema = new Schema({
    _id: Types.ObjectId,
    userId: {type: Number, require: true},
    productId: {type: Number, require: true},
    ratingPoint: {type: Number, require: true}
});
export const Rating = model('Rating',ratingSchema,'Ratings');