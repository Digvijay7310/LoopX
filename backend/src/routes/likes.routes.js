import express from 'express'
import { myLikes } from '../controllers/like.controller.js'

const router = express.Router()

router.get("/my-likes", myLikes)

export default router;