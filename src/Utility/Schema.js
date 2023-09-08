const Joi = require('joi');

// Joi schema for user registration request
exports.registrationSchema = Joi.object({
    email: Joi.string().email().required(),

});

exports.otpSchema = Joi.object({
    otp: Joi.number().required()
})

// Joi schema for user login request
exports.loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});
