import {User} from '../models/user.model.js'
import {ApiResponse} from '../utils/ApiResponse.js'
import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import jwt from 'jsonwebtoken'

// Signup new user
const signup = AsyncHandler(async(req, res) => {
    try {
        console.log("Request body: ", req.body)
        const {username, fullName, email, password, avatar, coverImage, channelDescription, myLink } = req.body;

        if(!username || !fullName ||!email || !password) {
            return res.status(400).json(new ApiResponse(400, null, "All fields are required"));
        }

        const existingUser = await User.findOne({$or: [{email}, {username}] });
        if(existingUser){
            return res.status(404).json(new ApiResponse(404, null, "User with username or email already exist."))
        }

        const user = new User({username, email, password, fullName, avatar, coverImage, channelDescription, myLink});
        await user.save();

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

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
            maxAge: 1 * 24 * 60 * 60 * 1000
        });

        res.status(201).json(new ApiResponse(201, {
            accessToken, 
            refreshToken,
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                password: user.password,
                fullName: user.fullName,
                avatar: user.avatar,
                coverImage: user.coverImage,
                channelDescription: user.channelDescription,
                myLink: user.myLink
            }
        }, 'User registered successfully'))
    } catch (error) {
        console.log("signup error", error)
        throw new ApiError(400, "user not registered.", error.message)
    };
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
            user: {
                _id: user._id,
                username: user.username,
                email: user.email,
                fullName: user.fullName,
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
            sameSite: "strict",
        });
        res.clearCookie("accessToken", {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "strict",
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

export {signup, login, logout, refreshToken};