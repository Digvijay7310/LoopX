import jwt from 'jsonwebtoken'
import { ApiError } from "../utils/ApiError.js";
import {Admin} from "../models/admin.model.js"
import {User} from "../models/user.model.js"

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.cookies?.accessToken;
    if (!token) {
      return next(new ApiError(401, "Access token not found"));
    }

    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    // Find user by decoded ID
    const user = await User.findById(decoded._id);
    if (user) {
      if (user.isBlocked) {
        return next(new ApiError(403, "User is blocked"));
      }
      req.user = { _id: user._id };  // Make sure this is set correctly
      req.role = "user";
      return next();
    }

    // If user not found, try admin (optional)
    const admin = await Admin.findById(decoded._id);
    if (admin) {
      req.user = { _id: admin._id };
      req.role = "admin";
      return next();
    }

    // Neither user nor admin found
    return next(new ApiError(401, "Invalid token user"));
  } catch (error) {
    console.error("Token verification error:", error.message);
    return next(new ApiError(401, "Unauthorized", error.message));
  }
};
