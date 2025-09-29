import express from 'express';
import { signup, login, logout, refreshToken } from '../controllers/auth.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.post("/signup",upload.fields([
    {name: "avatar", maxCount: 1},
    {name: "coverImage", maxCount: 1},
]), signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/refresh-token", refreshToken)

export default router