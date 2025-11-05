import Joi from 'joi';

export const reportSchema = Joi.object({
  reason: Joi.string()
    .max(1000)
    .required()
    .messages({
      'string.empty': 'Reason is required',
      'string.max': 'Reason cannot exceed 1000 characters',
    }),
});

