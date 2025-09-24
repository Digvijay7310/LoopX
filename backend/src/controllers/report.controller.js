import {Report} from '../models/report.model.js'
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { AsyncHandler } from '../utils/AsyncHandler.js'

const reportVideo = AsyncHandler(async(req, res) => {
    try {
        const {videoId} = req.params;
        const {reason} = req.body;
        const userId = req.user._id;
    
        if(!reason || reason.trim().length === 0){
            throw new ApiError(400, "Report reason is required")
        }

        const existing = await Report.findOne({user: userId, video: videoId})

        if(existing) {
            existing.reason = reason;
            existing.status = 'pending';
            await existing.save();
            return res.status(200).json(new ApiResponse(200, existing, "Report updated"))
        } else {
            const report  = await Report.create({user: userId, video: videoId, reason})
            return res.status(201).json(new ApiResponse(201, report, "Video reported"))
        }
    } catch (error) {
        console.log("Report video error: ", error)
    }
})

export {reportVideo};