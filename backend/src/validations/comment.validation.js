import Joi from "joi";

export const commentSchema = Joi.object({
    user: Joi.string().required().messages({
        'string.base': "User Id should be a string",
        'string.empty': 'User ID is required',
    }),
    video: Joi.string().required().messages({
        'string.base': 'Video ID should be a string',
        'string.empty': 'Video ID is required',
    }),
    text: Joi.string().max(1000).required().messages({
        'string.base': "Commetn text should be a string",
        'string.empty': 'Comment should not be empty',
        'string.max': 'Comment cannot exceed 1000 charcters',
    }),
    parentComment: Joi.string().optional().allow(null, '')
})