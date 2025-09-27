import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { getMe, getUserByUsername, myComments, myLikes, updateUserProfile } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get("/@:username", verifyToken, getUserByUsername);

router.get("/me", verifyToken, getMe);

router.patch("/profile/update", verifyToken,
    upload.fields([
        {name: "avatar", maxCount: 1},
        {name: "coverImage", maxCount: 1}
    ]),
    updateUserProfile);

    router.get("/my-likes", verifyToken, myLikes)
    router.get("/my-comments", verifyToken, myComments)

export default router