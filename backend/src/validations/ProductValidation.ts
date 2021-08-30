import Joi from "joi";

export const addProduct = {
  body: {
    name: Joi.string().required(),
    price: Joi.number().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required(),
    numReviews: Joi.number().required(),
  },
  file: {
    file: Joi.any().required(),
  },
};

export const updateProduct = {
  body: {
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required(),
    numReviews: Joi.number().required(),
  },
};

export const deleteProduct = {
  body: {
    _id: Joi.string().required(),
    name: Joi.string().required(),
    price: Joi.number().required(),
    img: Joi.string().required(),
    category: Joi.string().required(),
    description: Joi.string().required(),
    rating: Joi.number().required(),
    numReviews: Joi.number().required(),
  },
};

export const searchProduct = {
  body: {
    text: Joi.string().required(),
  },
};
