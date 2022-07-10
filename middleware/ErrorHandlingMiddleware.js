import e from "express";
import ApiError from "../error/ApiError.js";

export default function(err, req, res, next) {
    if (err instanceof ApiError) {
        return res.status(err.status).json(err.message)
    }
    return res.status(500).json({message: 'непредвиденная ошибка'})
}