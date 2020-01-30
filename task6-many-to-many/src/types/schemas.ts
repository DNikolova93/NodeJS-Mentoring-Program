import * as Joi from '@hapi/joi';

export const schemas = {
  user: Joi.object().keys({
    login: Joi.string().required(),
    password: Joi.string().alphanum().required(),
    age: Joi.number().min(3).max(130).required() }),
};
