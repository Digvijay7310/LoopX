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
  videoUrl: Joi.string()
    .uri()
    .required()
    .messages({
      'string.empty': 'Video URL is required',
      'string.uri': 'Video URL must be a valid URL',
    }),
  thumbnail: Joi.string()
    .uri()
    .required()
    .messages({
      'string.empty': 'Thumbnail URL is required',
      'string.uri': 'Thumbnail must be a valid URL',
    }),
  owner: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.pattern.base': 'Invalid owner ID format',
      'string.empty': 'Owner is required',
    }),
});
