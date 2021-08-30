import Joi from 'joi';

export const addAndUpdateCart = {
    body : {
        id: Joi.number().required(),
        userId: Joi.number().required(),
        productId: Joi.number().required(),
        amount: Joi.number().required()
    }
}

export const deleteCart = {
    body : {
        id: Joi.number().required()
    }
}

export const getAllCart = {
    body : {
        userId: Joi.number().required()
    }
}