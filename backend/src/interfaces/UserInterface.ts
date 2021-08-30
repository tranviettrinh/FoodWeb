import { Role } from './../constants';
import { model, Schema, Types } from 'mongoose';
import { IBase } from './BaseInterface';
export interface IUser extends IBase, Document {
    id: number,
    role: Role,
    name: string,
    username: string,
    password: string,
    dob: Date,
    address: string
}