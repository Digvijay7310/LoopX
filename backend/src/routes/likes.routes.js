import express from 'express';
import { myLikes } from '../controllers/like.controller.js';
import { verifyToken } from '../middlewares/verify.middleware.js';
import { isUser } from '../middlewares/user.middlware.js';

const router = express.Router();

router.get('/my-likes', verifyToken, isUser, myLikes);

export default router;
