import { ICart } from './../interfaces/CartInterface';
import { Cart } from "../model/CartModel";
import { Types } from 'mongoose';

class CartRepository{

    async addCart (cart:ICart):Promise<ICart>{
        try {
            let cartAdded = new Cart({
                _id: Types.ObjectId,
                ...cart
            });
            await cartAdded.save();
            return Cart.findOne({id:cart.id});
        } catch (error) {
            throw new Error(error);
        }
    }

    async updateCart (cart:ICart):Promise<ICart>{
        try {
            await Cart.updateOne({userId:cart.userId, productId:cart.productId},{...cart});
            return Cart.findOne({userId:cart.userId, productId:cart.productId});
        } catch (error) {
            throw new Error(error);
        }
    }

    async deleteCart (cart:ICart):Promise<ICart>{
        try {
            let cartDeleted = await Cart.findOneAndDelete({userId:cart.userId, productId:cart.productId});
            return cartDeleted;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findCart (cart:ICart):Promise<ICart>{
        try {
            return await Cart.findOne({userId:cart.userId, productId:cart.productId});
        } catch (error) {
            throw new Error(error);
        }
    }

    async findCartById (id:string):Promise<ICart>{
        try {
            return await Cart.findOne({id:id});
        } catch (error) {
            throw new Error(error);
        }
    } 

    async getAllCart (userId:string):Promise<ICart[]>{
        try {
            return await Cart.find({userId:userId});
        } catch (error) {
            throw new Error(error);
        }
    }

}

export = new CartRepository();