import express from 'express'
import { deleteComment, myComments } from '../controllers/comment.controller.js'
import { verifyToken } from '../middlewares/verify.middleware.js'

const router = express.Router()

router.get("/my-comments",verifyToken, myComments)
router.post("/delete-comment", verifyToken, deleteComment)

export default router