import express from 'express';
import { verifyToken } from '../middlewares/verify.middleware.js';
import { getMe, getUserByUsername, updateUserProfile } from '../controllers/user.controller.js';
import { upload } from '../middlewares/multer.middleware.js';

const router = express.Router();

router.get('/me', verifyToken, getMe);
router.get('/:username', verifyToken, getUserByUsername);

router.patch(
  '/profile/update',
  verifyToken,
  upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'coverImage', maxCount: 1 },
  ]),
  updateUserProfile,
);

export default router;
