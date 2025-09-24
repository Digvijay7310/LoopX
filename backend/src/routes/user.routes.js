import express from 'express'
import { verifyToken } from '../middlewares/verify.middleware.js';
import { updateUserProfile } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.patch("/profile/update", verifyToken,
    upload.fields([
        {name: "avatar", maxCount: 1},
        {name: "coverImage", maxCount: 1}
    ]),
    updateUserProfile);

export default router