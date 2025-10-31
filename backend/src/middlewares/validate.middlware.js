import { ApiError } from "../utils/ApiError.js";

export const validate = (schema) => {
    return (req, res, next) => {
        const {error, value} = schema.validate(req.body,{abortEarly: false});
        if(error){
            const message  = error.details.map((d) => d.message);
            return res.status(400).json(new ApiError(400, message, "error"))
        };
        req.body = value;
        next();
    }
}