import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

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

export { updateUserProfile };
