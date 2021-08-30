import { User } from './../model/UserModel';
import { IUser } from './../interfaces/UserInterface';
import { Types } from 'mongoose';
class UserRepository{

    async findUserbyName(username:string):Promise<IUser>{
        try {
            let userFound = await User.findOne({
                username:username
            });
            return userFound;
        } catch (error) {
            throw new Error(error);
        }
    }

    async findUserbyId(userId: string):Promise<IUser>{
        try {
            let userFound = await User.findOne({
                id:userId
            });
            return userFound;
        } catch (error) {
            throw new Error(error);
        }
    }

    async createUser(user:IUser):Promise<IUser>{
        try {
            let newUser = new User({
                _id: Types.ObjectId(),
                ...user
            });
            await newUser.save();
            return newUser;
        } catch (error) {
            throw new Error(error);
        }
    }


    async updateUser(user:IUser):Promise<IUser>{
        try {
            let userUpdated = new User({
                ...user
            });
            await User.updateOne({ _id: userUpdated._id},userUpdated);
            return userUpdated;
        } catch (error) {
            throw new Error(error);
        }
    }

    async loginUser(username:string, password: string):Promise<IUser>{
        try {
            let loggedUser = await User.findOne({
                username:username,
                password:password
            });
            return loggedUser;
        } catch (error) {
            throw new Error(error);
        }
    }
}
export = new UserRepository();