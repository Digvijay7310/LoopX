import { ApiError } from "../utils/ApiError.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import {Subscription} from '../models/subscribe.model.js'
import { ApiResponse } from "../utils/ApiResponse.js";


const toggleSubscribe = AsyncHandler(async(req, res) => {
   try {
     const {channelId} = req.params;
     const subscriberId = req.user._id;
 
     if(subscriberId.toString() == channelId){
         throw new ApiError(404, "You cannot subscribe to yourself");
     }
 
     const existing = await Subscription.findOne({subscriber: subscriberId, channel: channelId})
 
     if(existing) {
         await Subscription.findByIdAndDelete(existing._id)
         return res.status(200).json(new ApiResponse(200, null, "Unsubscribed successfully"))
     } else {
         await Subscription.create({subscriber: subscriberId, channel: channelId})
         return res.status(201).json(new ApiResponse(201, null, "Subscriber successfully!"))
     }
   } catch (error) {
    console.log("Error in toggle subscribe: ", error)
   }
})

export {toggleSubscribe}