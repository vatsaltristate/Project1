const Joi = require("joi");


const schema = {
  users : Joi.object({
    id:Joi.number().required(),
    firstName: Joi.string().required().trim(),
    lastName: Joi.string().required().trim(),
    gender: Joi.string().required().trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().trim(),
    number: Joi.number().required(),
  }),
};

module.exports = schema;
