import Joi from 'joi';

// Report validation
export const reportSchema = Joi.object({
  user: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.pattern.base': 'Invalid user ID format',
      'string.empty': 'User ID is required',
    }),
  video: Joi.string()
    .required()
    .regex(/^[0-9a-fA-F]{24}$/)
    .messages({
      'string.pattern.base': 'Invalid video ID format',
      'string.empty': 'Video ID is required',
    }),
  reason: Joi.string()
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Reason is required',
      'string.max': 'Reason cannot exceed 1000 characters',
    }),
  status: Joi.string()
    .valid('pending', 'reviewed', 'resolved')
    .optional()
    .messages({
      'any.only': 'Status must be one of pending, reviewed, or resolved',
    }),
});
