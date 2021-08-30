import Joi from 'joi';

export const addAndUpdateRating = {
    body : {
        userId: Joi.number().required(),
        productId: Joi.number().required(),
        ratingPoint: Joi.number().required()
    }
}

export const getAndFilterRating = {
    body : {
        _id: Joi.string().required(),
        userId: Joi.number().required(),
        productId: Joi.number().required(),
        ratingPoint: Joi.number().required()
    }
}

