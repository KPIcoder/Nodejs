const Joi = require('joi');

const {EMAIL_REGEX, PASSWORD_REGEX} = require("../constants");

module.exports = {
    nameValidator: Joi.string().trim().alphanum().min(2).max(99),
    ageValidator: Joi.number().integer().min(1).max(120),
    emailValidator: Joi.string().trim().regex(EMAIL_REGEX).lowercase(),
    passwordValidator: Joi.string().trim().regex(PASSWORD_REGEX).required()
}
