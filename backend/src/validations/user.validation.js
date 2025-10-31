import Joi from 'joi'

export const registerSchema = Joi.object({
    username: Joi.string()
    .min(3).max(30).required().messages({
        'string.base': 'Username should be a text',
        'string.empty': "Username should be not empty",
        'string.min': 'Usernmae should have at least 3 characters',
    }), 
    fullName: Joi.string()
    .min(3).max(30).required(),

    email: Joi.string()
    .email().required().messages({
        'string.email': 'Please provide a valid email address',
    }),

    password: Joi.string()
    .min(3).max(30).required(),

    avatar: Joi.string().uri().optional().allow(''),
    coverImage: Joi.string().uri().optional().allow(''),
    channelDescription: Joi.string().max(5000).optional().allow(''),
    myLink: Joi.string().uri().optional().allow('')
});

// Login Validation
export const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
})