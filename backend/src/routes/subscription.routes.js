import express from 'express';
import { verifyToken } from '../middlewares/verify.middleware.js';
import { validate } from '../middlewares/validate.middlware.js';
import { isUser } from '../middlewares/user.middlware.js';
import { SubscribeSchema } from '../validations/subscribe.model.js';
import { toggleSubscribe } from '../controllers/subscription.controller.js';


const router = express.Router()

// Subscribe or unsubscribe
router.post('/:username', verifyToken, isUser, validate(SubscribeSchema), toggleSubscribe);

export default router;