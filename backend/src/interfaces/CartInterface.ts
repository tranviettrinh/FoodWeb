import { Document } from 'mongoose';
import { IBase } from './BaseInterface';

export interface ICart extends IBase, Document{
    id: string,
    userId: string,
    productId: string,
    amount: number
}