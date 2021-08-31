import { updateUser } from './../validations';
import {login} from '../validations'
import { createUser } from './../validations';
import { BaseRouter } from "./BaseRouter";
import userService from '../services/UserService';
import {validate} from '../middleware';
class UserRouter extends BaseRouter{
    private _service = userService;
    constructor(){
        super();
        this.init();
    }
    protected init(){
        this.router.post('/createuser',validate(createUser),this._service.createUser);
        this.router.post('/signin',validate(login),this._service.loginUser);
        this.router.post('/updateuser',validate(updateUser),this._service.updateUser);
    }
}

export = new UserRouter().router;
