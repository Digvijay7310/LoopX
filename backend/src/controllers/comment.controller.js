import {Comment} from '../models/comment.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AsyncHandler } from '../utils/AsyncHandler.js'

const addCommentToVideo = AsyncHandler(async(req, res) => {
    try {
        const {videoId} = req.params;
        const {text} = req.body;
        const userId = req.user._id;
    
        if(!text || text.trim().length === 0){
            throw new ApiError(400, "Comment text is required")
        }
        const comment = await Comment.create({
            user: userId,
            video: videoId,
            text,
        });
    
        return res.status(201).json(new ApiResponse(201, comment, "Comment added"))
    } catch (error) {
        console.log("Error in add comment video ", error)
    }
});


const replyToComment = AsyncHandler(async(req,res) => {
   try {
     const {commentId} = req.params;
     const {text} = req.body;
     const userId = req.user._id;
 
     const parent = await Comment.findById(commentId).populate("video");
 
     if(!parent) throw new ApiError(404, "Comment not found");
 
     const video = parent.video;
 
     if(video.owner.toString() !== userId.toString()){
         throw new ApiError(403, "Only owner can reply to comments");
     }
 
     const reply = await Comment.create({
         user: userId,
         video,
         text,
         parentComment: commentId
     });
 
     return res.status(201).json(new ApiResponse(201, reply, "Reply added"))
   } catch (error) {
    console.log("Error in reply Comment: ", error)
   }
})


export {addCommentToVideo, replyToComment};