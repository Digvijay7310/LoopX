import { User } from "../models/user.model.js";
import { Video } from "../models/video.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getUserByUsername = AsyncHandler(async(req, res) => {
try {
        const {username} = req.params;
    
        const user = await User.findOne({username}).select("-password -refreshToken").lean();
    
        if(!user){
            throw new ApiError(404, "User not found")
        }

        const videos = await Video.find({owner: user._id}).lean();
        if(videos.length === 0) {
          throw new ApiError(404, "You don't have any videos")
        } 
    
        return res.status(200).json(new ApiResponse(200, {user, videos}, "User found successfully"))
} catch (error) {
    throw new ApiError(404, "User not found", error)
}
})

const getMe = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;

    const user = await User.findOne({_id: userId}).select("-password").lean();

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return res.status(200).json(new ApiResponse(200, user, "User found successfully"));
  } catch (error) {
    console.error("Error in getMe controller:", error);
    throw error; // or handle as you want
  }
});


const updateUserProfile = AsyncHandler(async (req, res) => {
    const { fullName, channelDescription } = req.body;

    // Find user by ID
    const user = await User.findById(req.user._id);
    if (!user) throw new ApiError(404, "User not found");

    // Update fullName if provided
    if (fullName) user.fullName = fullName;
    if(channelDescription) user.channelDescription = channelDescription;

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
        channelDescription: user.channelDescription,
        avatar: user.avatar,
        coverImage: user.coverImage
    }, "Profile updated successfully!"));
});


export { getUserByUsername, getMe, updateUserProfile };
