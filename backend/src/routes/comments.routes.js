import express from 'express'
import { myComments } from '../controllers/comment.controller.js'

const router = express.Router()

router.get("/my-comments", myComments)

export default router