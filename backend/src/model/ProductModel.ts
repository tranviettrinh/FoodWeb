import { IProduct } from "../interfaces/ProductInterface";
import { model, Schema, Types } from "mongoose";

const productSchema :Schema = new Schema({
    _id: Types.ObjectId,
    name: {type: String, require: true, unique: true},
    price: {type: Number, require: true},
    img: {type: String, require: true},
    category: {type: String, require: true},
    description: String,
    rating: Number,
    numReviews: Number
});
export const Product = model('Product',productSchema,'Products');