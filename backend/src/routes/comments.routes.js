import express from 'express';
import { deleteComment, myComments } from '../controllers/comment.controller.js';
import { verifyToken } from '../middlewares/verify.middleware.js';
import { isUser } from '../middlewares/user.middlware.js';

const router = express.Router();

router.get('/my-comments', verifyToken, isUser, myComments);
router.post('/delete-comment', verifyToken, isUser, deleteComment);

export default router;
