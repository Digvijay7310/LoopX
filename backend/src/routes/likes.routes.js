import express from 'express'
import { myLikes } from '../controllers/like.controller.js'
import { verifyToken } from '../middlewares/verify.middleware.js';

const router = express.Router()

router.get("/my-likes", verifyToken, myLikes)

export default router;