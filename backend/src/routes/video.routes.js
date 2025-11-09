import express from 'express';
import {
  deleteVideo,
  getVideoById,
  getVideosForHome,
  myVideos,
  searchVideos,
  updateVideoDetails,
  uploadVideo,
} from '../controllers/video.controller.js';
import { verifyToken } from '../middlewares/verify.middleware.js';
import { upload } from '../middlewares/multer.middleware.js';
import { toggleVideoLike } from '../controllers/like.controller.js';
import { addCommentToVideo, replyToComment } from '../controllers/comment.controller.js';
import { reportVideo } from '../controllers/report.controller.js';
import { isUser } from '../middlewares/user.middlware.js';
import { validate } from '../middlewares/validate.middlware.js';
import { commentSchema } from '../validations/comment.validation.js';
import { likeSchema } from '../validations/like.validation.js';
import { videoSchema } from '../validations/video.validation.js';
import { reportSchema } from '../validations/report.validation.js';

const router = express.Router();

// Search videos
router.get('/search', verifyToken, validate(videoSchema), searchVideos);

// Video upload
router.post(
  '/upload',
  verifyToken,
  isUser,
  upload.fields([
    { name: 'videoUrl', maxCount: 1 },
    { name: 'thumbnail', maxCount: 1 },
  ]),
  uploadVideo,
);

// Get video for home
router.get('/home', verifyToken, getVideosForHome);

// My videos
router.get('/my-videos', verifyToken, isUser, myVideos);

// Watch video
router.get('/:id', verifyToken, getVideoById);

// Video update
router.put('/:id/edit', verifyToken, isUser, updateVideoDetails);

// Video delete
router.delete('/:id/delete-video', verifyToken, deleteVideo);

// Video like or remove like
router.post('/:videoId/like', verifyToken, validate(likeSchema), toggleVideoLike);

// Add comment
router.post('/:videoId/comment', verifyToken, validate(commentSchema), addCommentToVideo);

// Comment reply
router.post('/comment/:commentId/reply', verifyToken, replyToComment);

// Report video
router.post('/:videoId/report', verifyToken, validate(reportSchema), reportVideo);



export default router;
