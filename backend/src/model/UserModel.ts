import { IUser } from '../interfaces/UserInterface';
import { model, Schema, Types } from "mongoose";
import { Role } from '../constants';

const userSchema :Schema = new Schema({
    _id: Types.ObjectId,
    id: {type: Number, require: true},
    role: {type: Role, require: true},
    name: {type: String, require: true},
    username: {type: String, require: true},
    password: {type: String, require: true},
    dob: Date,
    address: String
});
export const User = model('User',userSchema,'Users')