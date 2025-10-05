import {ApiError} from '../utils/ApiError.js'

export const isAdmin = (req, res, next ) => {
    if(req.role !== "admin"){
        return next(new ApiError(403, "Access Denied: Admin only/"))
    }
    next()
}