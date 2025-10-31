import Joi from "joi";

export const adminRegisterSchema = Joi.object({
    fullName: Joi.string()
    .min(3).max(30).required().messages({
        'string.empty': "FullName is required",
        'string.min': "FullName must be at least 3 charcter",
    }),
    email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
        'string.empty': "Email is required",
        'string.email': "Please provide a valid email",
    }),
    password: Joi.string()
    .min(3).max(50).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 3 charcters'
    }),
})

export const adminLoginSchema = Joi.object({
    email: Joi.string()
    .email({tlds: {allow: false}})
    .required()
    .messages({
        'string.empty': "Email is required",
        'string.email': "Please provide a valid email",
    }),
    password: Joi.string()
    .required()
    .messages({
        'string.empty': 'Password is required'
    })
})