import {User} from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'
import { uploadOnCloudinary } from '../utils/cloudinary.js'

// Signup new user
const checkUsername = AsyncHandler (async (req, res) => {
    const {username} = req.query;

    if(!username) return new ApiError(403, "Username is required")
        try {
            const existingUser = await User.findOne({username})
            if(existingUser) {
                return res.status(200).json({available: false})
            } else {
                return res.status(200).json({available: true})
            }
        } catch (error) {
            console.log("Error in checkUsername: ", error)
        }
});

const checkEmail = AsyncHandler(async (req, res) => {
    const { email } = req.query;
    if (!email || !email.includes('@')) {
        return res.status(400).json({ message: 'Invalid email' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        return res.json({ available: !user });
    } catch (err) {
        console.error("Email check error:", err);
        return res.status(500).json({ message: 'Server error' });
    }
})
const signup = AsyncHandler(async (req, res) => {
    try {
        console.log("Request body: ", req.body);

        const {
            username,
            fullName,
            email,
            password,
            channelDescription,
            myLink
        } = req.body;

        if (!username || !fullName || !email || !password) {
            return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
        }

        const existingUser = await User.findOne({
            $or: [{ email }, { username }]
        });

        if (existingUser) {
            return res.status(409).json(new ApiResponse(409, null, "User with username or email already exists."));
        }

        // Upload avatar if provided
        let avatarUrl = undefined;
        if (req.files?.avatar?.[0]?.path) {
            const avatarUpload = await uploadOnCloudinary(req.files.avatar[0].path);
            if (!avatarUpload?.secure_url) {
                throw new ApiError(500, "Failed to upload avatar");
            }
            avatarUrl = avatarUpload.secure_url;
        }

        // Upload coverImage if provided
        let coverImageUrl = undefined;
        if (req.files?.coverImage?.[0]?.path) {
            const coverImageUpload = await uploadOnCloudinary(req.files.coverImage[0].path);
            if (!coverImageUpload?.secure_url) {
                throw new ApiError(500, "Failed to upload cover image");
            }
            coverImageUrl = coverImageUpload.secure_url;
        }

        // Create new user with uploaded image URLs or schema defaults
        const user = new User({
            username,
            fullName,
            email,
            password,
            avatar: avatarUrl,
            coverImage: coverImageUrl,
            channelDescription,
            myLink
        });

        await user.save();

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json(new ApiResponse(201, {
            accessToken,
            refreshToken,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                avatar: user.avatar,
                coverImage: user.coverImage,
                channelDescription: user.channelDescription,
                myLink: user.myLink
            }
        }, 'User registered successfully'));
    } catch (error) {
        console.log("signup error", error);
        throw new ApiError(500, "User not registered.", error.message);
    }
});

const login = AsyncHandler(async(req, res) => {
    try {
        const {email, password} = req.body;

        if(!email || !password){
            return res.status(400).json(new ApiResponse(400, null, "Email and password are required."))
        }
        const user = await User.findOne({email});
        if(!user){
            return res.status(401).json(new ApiResponse(401, null, "Invalid email and password."))
        }

        const isMatch = await user.isPasswordCorrect(password);
        if(!isMatch){
            return res.status(401).json(new ApiResponse(401, null, "Invalid email and password"))
        }

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json(new ApiResponse(200, {
            accessToken,
            refreshToken,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
                isBlocked: user.isBlocked
            }
        }, "User login successfull"))
    } catch (error) {
        throw new ApiError(400, "User not login", error.message)
    }
})

const logout = AsyncHandler(async(req, res) => {
    try {
        res.clearCookie("refreshToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
        });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
        });
        res.status(200).json(new ApiResponse(200, null, "Logged out successfully"))
    } catch (error) {
        throw new ApiError(401, {}, "User not logout")
    }
})

const refreshToken = AsyncHandler(async (req, res) => {
    try {
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(401).json(new ApiResponse(401, null, "Refresh token not found"))
        }

        jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async(err, decoded) => {
            if(err) return res.status(403).json(new ApiResponse(403, null, "Invalid refresh token"));

            // Find user from decoded token
            const user = await User.findById(decoded._id);
            if(!user) return res.status(404).json(new ApiResponse(404, null, "User not found"))

                const accessToken = user.generateAccessToken();
                res.status(200).json(new ApiResponse(200, {accessToken}, "Access Token refreshed"))
        })
    } catch (error) {
        throw new ApiError(404, "not refreshToken")
    }
})

export {checkEmail, checkUsername, signup, login, logout, refreshToken};