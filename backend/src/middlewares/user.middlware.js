import {ApiError} from '../utils/ApiError.js'

export const isUser = (req, res, next) => {
    if(req.role !== "user"){
        return next(new ApiError(403, "Access Denied users only"))
    }
    next()
}