import Joi from 'joi'

export const commentSchema = Joi.object({
  text: Joi.string().max(1000).required().messages({
    'string.base': "Comment text should be a string",
    'string.empty': 'Comment should not be empty',
    'string.max': 'Comment cannot exceed 1000 characters',
  }),
  parentComment: Joi.string().optional().allow(null, '')
});
