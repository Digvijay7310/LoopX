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
    const userId = req.user._id;

    const likes = await Like.find({ user: userId }).populate('video');

    const likedVideos = likes.map(like => like.video);

    return res.status(200).json(new ApiResponse(200, likedVideos, "Liked videos fetched successfully"));
});

export {toggleVideoLike, myLikes}