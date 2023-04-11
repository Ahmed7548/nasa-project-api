import { RequestHandler } from "express";
import Launch, { DbLaunch } from "../models/launches";
import HttpError from "../errors/HttpError";
import { ResType } from "../types";



export const getLaunches: RequestHandler<any,ResType<DbLaunch[]>> = async (req, res, next) => {
  try {
    const launches = await Launch.getAll()
    res.status(200).json(launches)
  } catch (err) {
    next(new HttpError(500,"couldn't get your request"))
  }
}
