import Joi from 'joi'

export const SubscribeSchema = Joi.object({
    subscriber: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
        'sting.pattern.base': 'Invalid subscriber ID format',
        'string.empty': 'Subscriber ID is required',
    }),
    channel: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).messages({
        'string.pattern.base': 'Invalid channel ID format',
        'string.empty': 'Channel ID is required',
    }),
})