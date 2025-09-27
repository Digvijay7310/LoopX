import { Comment } from "../models/comment.model.js";
import { Like } from "../models/like.model.js";
import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getUserByUsername = AsyncHandler(async(req, res) => {
try {
        const {username} = req.params;
        if(!/^[a-zA-Z]+$/.test(username)){
            return new ApiError(400, "Invalid user format")
        }
    
        const user = await User.findOne({username}).select("-password -refreshToken").lean();
    
        if(!user){
            throw new ApiError(404, "User not found")
        }

        const videos = await Video.find({owner: user._id}).lean()
        if(!videos) new ApiError(400, "User don't have videos")
    
        return res.status(200).json(new ApiResponse(200, {user, videos}, "User found successfully"))
} catch (error) {
    console.log("Error while getUser: ", error)
}
})

const getMe = AsyncHandler(async (req, res) => {
    const {userId} = req.user._id;

    const user = await User.findOne({id: userId})

    if(!user){
        new ApiError(404, "User npt found")
    } 
    return res.status(200).json(new ApiResponse(200, user, "User found"))
})

const updateUserProfile = AsyncHandler(async (req, res) => {
    const { fullName } = req.body;

    // Find user by ID
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    // Update fullName if provided
    if (fullName) user.fullName = fullName;

    // Upload avatar if provided
    if (req.files?.avatar?.[0]?.path) {
        const avatarUpload = await uploadOnCloudinary(req.files.avatar[0].path);
        if (!avatarUpload?.secure_url) {
            throw new ApiError(500, "Failed to upload avatar");
        }
        user.avatar = avatarUpload.secure_url;
    }

    // Upload coverImage if provided
    if (req.files?.coverImage?.[0]?.path) {
        const coverImageUpload = await uploadOnCloudinary(req.files.coverImage[0].path);
        if (!coverImageUpload?.secure_url) {
            throw new ApiError(500, "Failed to upload cover image");
        }
        user.coverImage = coverImageUpload.secure_url;
    }

    // Save updated user
    await user.save();

    // Return success response
    return res.status(200).json(new ApiResponse(200, {
        fullName: user.fullName,
        avatar: user.avatar,
        coverImage: user.coverImage
    }, "Profile updated successfully!"));
});

const myLikes = AsyncHandler(async (req, res) => {
  try {
    const user = req.user;
    if (!user) throw new ApiError(403, "Invalid credentials");

    const likes = await Like.find({ user: user._id })
      .populate({
        path: "video",
        select: "title thumbnail createdAt owner", // get necessary fields
        populate: {
          path: "owner",
          select: "username avatar" // populate nested owner data
        }
      });

    if (likes.length === 0) {
      throw new ApiError(404, "User has no likes");
    }

    const likeCount = await Like.countDocuments({ user: user._id });

    return res.status(200).json(
      new ApiResponse(200, { likeCount, likes }, "User likes fetched")
    );
  } catch (error) {
    console.log("Error in fetching likes: ", error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
});

const myComments = AsyncHandler(async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      throw new ApiError(403, "Invalid credentials");
    }

    // Fetch comments with populated video and nested owner
    const comments = await Comment.find({ user: user._id })
      .populate({
        path: "video",
        select: "title thumbnail createdAt owner",
        populate: {
          path: "owner",
          select: "username avatar"
        }
      })
      .sort({ createdAt: -1 });

    if (!comments || comments.length === 0) {
      throw new ApiError(404, "User has no comments");
    }

    const commentCount = await Comment.countDocuments({ user: user._id });

    return res.status(200).json(
      new ApiResponse(200, { commentCount, comments }, "User comments fetched")
    );
  } catch (error) {
    console.error("Error in fetching comments: ", error);
    return res.status(500).json(new ApiError(500, "Internal server error"));
  }
});

export { getUserByUsername, getMe, updateUserProfile, myLikes, myComments };
