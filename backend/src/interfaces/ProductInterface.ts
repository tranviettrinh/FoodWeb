import { Document } from 'mongoose';
import { IBase } from './BaseInterface';
export interface IProduct extends IBase, Document{
    name: string,
    price: number,
    img: string,
    category: string,
    description: string,
    rating: number,
    numReviews: number
}
