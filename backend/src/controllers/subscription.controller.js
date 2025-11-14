import { ApiError } from '../utils/ApiError.js';
import { AsyncHandler } from '../utils/AsyncHandler.js';
import { Subscription } from '../models/subscribe.model.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import {User} from '../models/user.model.js'

const toggleSubscribe = AsyncHandler(async (req, res) => {
  const {username} = req.params;
  const subscriberId = req.user._id;

  try {
    const channel = await User.findOne({username}, {_id: 1}).lean()
    if(!channel){
      throw new ApiError(404, "User not found")
    }

    if(subscriberId.toString() === channel._id.toString()){
      throw new ApiError(400, 'You cannot subscribe to yourself')
    }

    const Unsubscribed = await Subscription.findOne({
      subscriber: subscriberId,
      channel: channel._id
    });

    if(Unsubscribed) {
      return res.status(200).json(new ApiResponse(200, null , 'Unsubscribed successfully'));
    } 

    // If nt subscribe, create subscription
    await Subscription.create({subscriber: subscriberId, channel: channel._id})
    return res.status(201).json(new ApiResponse(201, null, "Subscribed successfully"))
  } catch (error) {
    console.log('Error in toggle subscribe: ',error)
    return res.status(500).json(new ApiResponse(500, null, "Internal server Error"))
    
  }
});

const getSubscriptionStats = AsyncHandler(async (req, res) => {
  const userId = req.user._id;

  try {
    const subscriptions = await Subscription.find({ subscriber: userId })
      .populate("channel", "username avatar")
      .lean();

    if (!subscriptions || subscriptions.length === 0) {
      return res.status(200).json(
        new ApiResponse(200, { count: 0, channels: [] }, "No subscriptions found")
      );
    }

    const validSubscriptions = subscriptions.filter(sub => sub.channel);

    const subscribedChannels = validSubscriptions.map((sub) => ({
      _id: sub.channel._id,
      username: sub.channel.username,
      avatar: sub.channel.avatar,
    }));

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          count: subscribedChannels.length,
          channels: subscribedChannels,
        }, 
        "User subscriptions fetched successfully"
      )
    );
  } catch (error) {
    console.error("Error fetching subscriptions:", error);
    return res
      .status(400)
      .json(new ApiResponse(400, null, "Subscription not found"));
  }
});

const getMySubscibers = AsyncHandler(async(req, res) => {
  const userId = req.user._id;

  try {
    const subscribers = await Subscription.find({channel: userId})
    .populate('subscriber', 'username avatar')
    .lean();

    if(!subscribers || subscribers.length === 0){
      return res.status(200).json(
        new ApiResponse(200, {count: 0, subscribers: []}, "You don't have any sybscribers yet.")
      )
    }

    const subscriberList = subscribers.map((sub) => ({
      _id: sub.subscriber._id,
      username: sub.subscriber.username,
      avatar: sub.subscriber.avatar,
    }));

    return res.status(200).json(
      new ApiResponse(
        200, {
          count: subscriberList.length,
          subscribers: subscriberList,
        }, 
        "Subscribers fetched successfully"
      )
    );
  } catch (error) {
    return res.status(500).json(new ApiResponse(500, null, 'Failed to fetch subscribers'))
  }
});




export { toggleSubscribe, getSubscriptionStats, getMySubscibers };
