import Joi from 'joi';

// Video validation for creating a new video
export const videoSchema = Joi.object({
  title: Joi.string()
    .max(100)
    .required()
    .messages({
      'string.empty': 'Title is required',
      'string.max': 'Title cannot exceed 100 characters',
    }),
  description: Joi.string()
    .max(5000)
    .required()
    .messages({
      'string.empty': 'Description is required',
      'string.max': 'Description cannot exceed 5000 characters',
    }),
  category: Joi.string().optional().allow(''),
  owner: Joi.string()
    .required()
    .messages({
      'string.pattern.base': 'Invalid owner ID format',
      'string.empty': 'Owner is required',
    }),
});
