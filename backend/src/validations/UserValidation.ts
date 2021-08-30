import Joi from 'joi';

export const login = {
    body : {
        username: Joi.string().required(),
        password: Joi.string().required()
    }
}

export const createUser = {
    body : {
        id: Joi.number().required(),
        role: Joi.any().required(),
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        dob: Joi.date(),
        address: Joi.string()
    }
}

export const updateUser = {
    body : {
        _id: Joi.string().required(),
        id: Joi.number().required(),
        role: Joi.any().required(),
        name: Joi.string().required(),
        username: Joi.string().required(),
        password: Joi.string().required(),
        dob: Joi.date(),
        address: Joi.string()
    }
}