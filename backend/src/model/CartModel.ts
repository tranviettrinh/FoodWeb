import { model, Schema, Types } from "mongoose";
import { ICart } from "../interfaces/CartInterface";

const cartSchema: Schema = new Schema({
    _id: Types.ObjectId,
    id: {type:Number, require: true},
    userId: {type:String, require: true},
    productId: {type:String, require: true},
    amount: {type:Number, require: true}
});
export const Cart = model('Cart',cartSchema,'Carts');
