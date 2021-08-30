import { Document } from 'mongoose';
import { IBase } from './BaseInterface';

export interface IRating extends IBase, Document{
    userId: string,
    productId: string,
    ratingPoint: number
}