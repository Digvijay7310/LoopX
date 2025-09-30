import {Like} from '../models/like.model.js'
import { ApiError } from '../utils/ApiError.js'
import { ApiResponse } from '../utils/ApiResponse.js'
import { AsyncHandler } from '../utils/AsyncHandler.js'

const toggleVideoLike = AsyncHandler(async(req, res)=> {
    const {videoId} = req.params;
    const userId = req.user._id;

    const existingLike = await Like.findOne({user: userId, video: videoId})

    if(existingLike){
        await Like.findByIdAndDelete(existingLike._id);
        return res.status(200).json(new ApiResponse(200, null, "Video unliked"))
    } else {
        await Like.create({user: userId, video: videoId})
        return res.status(200).json(new ApiResponse(200, null, "Video Liked"))
    }
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

export {toggleVideoLike, myLikes}