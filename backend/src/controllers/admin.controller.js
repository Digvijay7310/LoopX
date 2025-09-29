import { Admin } from "../models/admin.model.js";
import { User } from "../models/user.model.js";
import {Like} from "../models/like.model.js"
import {Video} from "../models/video.model.js"
import {Comment} from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { AsyncHandler } from "../utils/AsyncHandler.js";


const adminRegister = AsyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!email || !fullName || !password) {
    throw new ApiError(403, "All fields are required");
  }

  const existingAdmin = await Admin.findOne({ email });
  if (existingAdmin) {
    throw new ApiError(403, "Admin with this email already exists.");
  }

  const admin = await Admin.create({ email, fullName, password });

  const accessToken = admin.generateAccessToken();
  const refreshToken = admin.generateRefreshToken();

  // Set cookies
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: "strict",
    maxAge: 1 * 24 * 60 * 60 * 1000 // 1 day
  });

  // Return response (omit password)
  res.status(201).json(new ApiResponse(201, {
    admin: {
      _id: admin._id,
      email: admin.email,
      fullName: admin.fullName
    }
  }, "Admin registered successfully"));
});

const adminLogin = AsyncHandler(async (req, res) => {
    try {
    const {email, password} = req.body;
    
    if(!email || !password) return new ApiResponse(403, null, "All fields are required")

        const admin = await Admin.findOne({email})
        if(!admin) throw new ApiError(403, "Invalid credentials")

             const isMatch = await admin.isPasswordCorrect(password);
        if(!isMatch){
            return res.status(401).json(new ApiResponse(401, null, "Invalid email and password"))
        }

        const accessToken = admin.generateAccessToken();
        const refreshToken = admin.generateRefreshToken();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json(new ApiResponse(200, {
            accessToken,
            refreshToken,
            admin: {
                _id: admin._id,
                email: admin.email,
                fullName: admin.fullName,
            }
        }, "Admin login successfull"))
    } catch (error) {
        throw new ApiError(400, "Admin not login", error.message)
    }

})

const getAllUser = AsyncHandler(async (req, res) => {
    try {
        const usersCount = await User.countDocuments();
        const likesCount = await Like.countDocuments();
        const videosCount = await Video.countDocuments();
        const commentsCount = await Comment.countDocuments();  // use countDocuments here

        // Check if any count is undefined or null (0 is a valid count)
        if (
            usersCount === undefined || 
            likesCount === undefined || 
            videosCount === undefined || 
            commentsCount === undefined
        ) {
            return res.status(403).json(new ApiResponse(403, null, "Something went wrong"));
        }

        res.status(200).json(new ApiResponse(200, { usersCount, likesCount, videosCount, commentsCount }, "All details fetched"));
    } catch (error) {
        console.log("Error in get All users: ", error);
        res.status(500).json(new ApiResponse(500, null, "Internal server error"));
    }
});

export {adminRegister, adminLogin, getAllUser}