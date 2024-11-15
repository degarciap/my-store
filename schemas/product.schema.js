const Joi = require ('joi');

const id = Joi.string().uuid();
const name = Joi.string().alphanum;
const price = Joi.number().integer();

const createProductSchema = Joi.object({
    name: name.required(),
    price: price.required(),
    image: image.required()
});

const updateProductSchema = Joi.object({
    name: name,
    price: price,
    image: image
});

const getProductSchema = Joi.object({
    id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema}