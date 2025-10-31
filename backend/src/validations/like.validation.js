import Joi from 'joi';

export const likeSchema = Joi.object({
    user: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': 'Invalid user ID format',
        'string.empty': 'User ID is required',
    }),
    video: Joi.string().required().regex(/[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': 'Invalid video ID format',
        'string.empty': 'Video ID is required',
    })
})