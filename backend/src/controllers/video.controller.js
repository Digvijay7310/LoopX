import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { Video } from '../models/video.model.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import { Like } from '../models/like.model.js';
import { Comment } from '../models/comment.model.js';
import { Subscription } from '../models/subscribe.model.js';
import { User } from '../models/user.model.js';

const uploadVideo = AsyncHandler(async (req, res) => {
  try {
    if (req.user?.isBlocked === true) {
      throw new ApiError(403, 'You are blocked and you cannot upload a video');
    }

    const { title, description, category } = req.body;
    const videoUrl = req.files?.videoUrl?.[0]?.path;
    const thumbnail = req.files?.thumbnail?.[0]?.path;

    if (!title || !description || !videoUrl || !thumbnail) {
      throw new ApiError(400, 'All fields are required');
    }

    const videoUpload = await uploadOnCloudinary(videoUrl);
    const thumbnailUpload = await uploadOnCloudinary(thumbnail);

    if (!videoUpload || !thumbnailUpload) {
      throw new ApiError(500, 'Cloudinary upload failed');
    }

    const video = await Video.create({
      title,
      description,
      videoUrl: videoUpload,
      category,
      thumbnail: thumbnailUpload,
      owner: req.user._id, // assuming req.user is user object
    });

    return res.status(201).json(new ApiResponse(201, video, 'Video uploaded successfully'));
  } catch (error) {
    console.log('Video upload error: ', error);
    // Pass the error to your error handler middleware:
    throw error;
  }
});

const getVideosForHome = AsyncHandler(async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const lastId = req.query.lastId;

    let query = {}
    if(lastId){
      query = {_id: {$lt: lastId}}
    }
    const videos = await Video.find(query).sort({createdAt: -1})
    .limit(limit)
    .populate("owner", 'username avatar')

    if(!videos || videos.length === 0){
      throw  new ApiError(404, "no Video found")
    }
    res.status(200).json(new ApiResponse(200, videos, 'Video fetch successfully!'))
  } catch (error) {
    console.error("getVideo for home", error)
    throw new ApiError(500, "Internal server error in getVideoForHome")
  }
})

const myVideos = AsyncHandler(async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    throw new ApiError(401, 'Unauthorized: User ID not found in request');
  }

  const videos = await Video.find({ owner: userId })
    .populate('owner', 'username avatar')
    .sort({ createdAt: -1 });

  if (!videos || videos.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, { videos: [], videoCount: 0 }, 'No videos found for the user'));
  }

  const videoCount = videos.length;

  return res
    .status(200)
    .json(new ApiResponse(200, { videos, videoCount }, 'User videos fetched successfully'));
});

const getVideoById = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  const video = await Video.findById(id)
    .populate('owner', 'username avatar')
    .lean();

  if (!video) throw new ApiError(404, 'Video not found');

  // Increment view count
  await Video.findByIdAndUpdate(id, { $inc: { views: 1 } });

  // Parallel likes + likeByUser fetch
  const [likesCount, likeByCurrentUser] = await Promise.all([
    Like.countDocuments({ video: id }),
    Like.exists({ video: id, user: userId }),
  ]);

  // ✅ Count comments
  const commentsCount = await Comment.countDocuments({ video: id });

  // ✅ Get few recent like users
  const likeUsers = await Like.find({ video: id })
    .limit(5)
    .populate('user', 'username avatar')
    .lean();

  // ✅ Fetch top-level comments
  const comments = await Comment.find({ video: id, parentComment: null })
    .populate('user', 'username avatar')
    .sort({ createdAt: -1 })
    .lean();

  const commentList = comments.map((comment) => ({
    _id: comment._id,
    text: comment.text,
    createdAt: comment.createdAt,
    user: comment.user,
  }));

  // ✅ Check subscription
  const isSubscribed = await Subscription.exists({
    subscriber: userId,
    channel: video.owner._id,
  });

  const subscriberCount = await Subscription.countDocuments({channel: video.owner._id})

  // ✅ Related videos (same owner)
  const relatedVideos = await Video.find({
    owner: video.owner._id,
    _id: { $ne: video._id },
  })
    .populate('owner', 'username avatar')
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  // ✅ Random videos (populate manually)
  const randomVideosAgg = await Video.aggregate([
    { $match: { _id: { $ne: video._id } } },
    { $sample: { size: 5 } },
  ]);
  const randomVideoIds = randomVideosAgg.map(v => v._id);
  const randomVideos = await Video.find({ _id: { $in: randomVideoIds } })
    .populate('owner', 'username avatar')
    .lean();

  // ✅ Send response
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        video,
        views: video.views + 1,
        likes: {
          count: likesCount,
          likeByCurrentUser: !!likeByCurrentUser,
          users: likeUsers,
        },
        comments: {
          count: commentsCount,
          list: commentList,
        },
        subscribed: !!isSubscribed,
        subscriberCount,
        relatedVideos,
        randomVideos,
      },
      'Video fetched successfully',
    ),
  );
});

const updateVideoDetails = AsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;

  const video = await Video.findById(id);

  if (!video) throw new ApiError(404, 'Video not found');

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'Unauthorized: Not the owner of the video');
  }
  if (title) video.title = title;
  if (description) video.description = description;

  await video.save();
  return res.status(200).json(new ApiResponse(200, video, 'Video updated successfully'));
});

const deleteVideo = AsyncHandler(async (req, res) => {
  const { id } = req.params;

  const video = await Video.findById(id);
  if (!video) throw new ApiError(404, 'Video not found');

  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, 'You are not authorized to delete this video');
  }
  await video.deleteOne();

  return res.status(200).json(new ApiResponse(200, null, 'Video deleted successfully'));
});

const searchVideos = AsyncHandler(async (req, res) => {
  const { q = '', category = '', sort = 'createdAt', page = 1, limit = 10 } = req.query;

  const searchQuery = q.trim();
  const skip = (parseInt(page) - 1) * parseInt(limit);

  let userIds = [];

  if (searchQuery) {
    // Search users by username or fullName to get matching owner ids
    const users = await User.find({
      $or: [
        { username: { $regex: searchQuery, $options: 'i' } },
        { fullName: { $regex: searchQuery, $options: 'i' } },
      ],
    }).select('_id');

    userIds = users.map((user) => user._id);
  }

  // Build MongoDB query
  const query = {
    ...(searchQuery && {
      $or: [{ title: { $regex: searchQuery, $options: 'i' } }, { owner: { $in: userIds } }],
    }),
    ...(category && { category: { $regex: category, $options: 'i' } }),
  };

  // Choose sort option
  const sortOption = sort === 'views' ? { views: -1 } : { createdAt: -1 };

  const total = await Video.countDocuments(query);

  const videos = await Video.find(query)
    .populate('owner', 'username avatar')
    .sort(sortOption)
    .skip(skip)
    .limit(parseInt(limit))
    .select('title thumbnail videoUrl description views owner');

  const formattedVideos = videos.map((video) => ({
    _id: video._id,
    title: video.title,
    thumbnail: video.thumbnail,
    videoUrl: video.videoUrl,
    description:
      video.description.length > 100 ? video.description.slice(0, 100) + '...' : video.description,
    views: video.views,
    owner: {
      username: video.owner.username,
      avatar: video.owner.avatar,
    },
  }));

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        results: formattedVideos,
      },
      'Search results fetched',
    ),
  );
});

export {
  uploadVideo,
  getVideosForHome,
  myVideos,
  getVideoById,
  updateVideoDetails,
  deleteVideo,
  searchVideos,
};
