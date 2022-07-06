const Joi = require('joi');

const {nameValidator, ageValidator, emailValidator, passwordValidator} = require('./commonValidator');

module.exports = {
    newUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
        email: emailValidator.required(),
        password: passwordValidator.required(),
    }),
    updatedUserValidator: Joi.object({
        name: nameValidator.required(),
        age: ageValidator.required(),
    }),
    userIdValidator: Joi.string().alphanum().length(24).required()
}
