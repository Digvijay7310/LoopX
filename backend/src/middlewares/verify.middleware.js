import jwt from 'jsonwebtoken';
import {ApiError} from '../utils/ApiError.js'
import {Admin} from '../models/admin.model.js'
import {User} from '../models/user.model.js'


export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken;
        if(!token) throw new ApiError(401, "Token not found");

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        // try find user first in user collection
        let user = await User.findById(decoded._id);
        if(user){
            if(user.isBlocked) throw new ApiError(403, "User is blocked");
            req.user = user;
            req.role = "user";
            return next();
        }

        // try find admin if not user
        let admin = await Admin.findById(decoded._id);
        if(admin){
            req.user = admin;
            req.role = 'admin';
            return next();
        }

        throw new ApiError(401, "Invalid token user");
    } catch (error) {
        return next(new ApiError(404, "Unauthorized", error.message));
    }
}