import { RequestHandler } from "express";
import Launch, { DbLaunch } from "../models/launches";
import HttpError from "../errors/HttpError";
import { CustomRequestHandler } from "../types";
import catchAsyncError from "../helpers/catchAsyncError";


export const getLaunches =catchAsyncError<CustomRequestHandler<DbLaunch[]>>( async (req, res, next) => {
    const launches = await Launch.getAll()
    res.status(200).json(launches)
})
