import { Comment } from '../models/comment.model.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';

const addCommentToVideo = AsyncHandler(async (req, res) => {
  try {
    const { videoId } = req.params;
    const { text, parentComment } = req.body;
    const userId = req.user._id; // from verifyToken middleware

    if (!text || text.trim().length === 0) {
      throw new ApiError(400, 'Comment text is required');
    }

    const comment = await Comment.create({
      user: userId,
      video: videoId,
      text,
      parentComment: parentComment || null,
    });

    return res.status(201).json(new ApiResponse(201, comment, 'Comment added'));
  } catch (error) {
    console.error('Error in add comment video', error);
    throw error; // make sure to send proper response
  }
});


const myComments = AsyncHandler(async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiError(403, 'Invalid credentials');
    }

    // Fetch comments with populated video and nested owner
    const comments = await Comment.find({ user: user._id })
      .populate({
        path: 'video',
        select: 'title thumbnail createdAt owner',
        populate: {
          path: 'owner',
          select: 'username avatar',
        },
      })
      .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      throw new ApiError(404, 'User has no comments');
    }

    const commentCount = await Comment.countDocuments({ user: user._id });

    return res
      .status(200)
      .json(new ApiResponse(200, { commentCount, comments }, 'User comments fetched'));
  } catch (error) {
    console.error('Error in fetching comments: ', error);
    return res.status(500).json(new ApiError(500, 'Internal server error'));
  }
});

const deleteComment = AsyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { commentId } = req.body;

    if (!user) throw new ApiError(403, 'User not authenticated');
    if (!commentId) throw new ApiError(400, 'Comment ID is required');

    const comment = await Comment.findById(commentId);
    if (!comment) throw new ApiError(404, 'Comment not found');

    if (comment.user.toString() !== user._id.toString()) {
      throw new ApiError(403, 'Not authorized to delete this comment');
    }

    await Comment.deleteOne({ _id: commentId });

    return res.status(200).json(new ApiResponse(200, null, 'Comment deleted successfully'));
  } catch (error) {
    console.log('Error in deleteComment: ', error);
  }
});

const replyToComment = AsyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { text } = req.body;
    const userId = req.user._id;

    const parent = await Comment.findById(commentId).populate('video');

    if (!parent) throw new ApiError(404, 'Comment not found');

    const video = parent.video;

    if (video.owner.toString() !== userId.toString()) {
      throw new ApiError(403, 'Only owner can reply to comments');
    }

    const reply = await Comment.create({
      user: userId,
      video,
      text,
      parentComment: commentId,
    });

    return res.status(201).json(new ApiResponse(201, reply, 'Reply added'));
  } catch (error) {
    console.log('Error in reply Comment: ', error);
  }
});

export { addCommentToVideo, replyToComment, myComments, deleteComment };
