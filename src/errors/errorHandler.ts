import { ErrorRequestHandler } from "express"
import HttpError from "./HttpError"
import { ErrorResponse } from "../types"
export const errorHander: ErrorRequestHandler<any,ErrorResponse> = (err, req, res, next)=>{
  if (err instanceof HttpError) {
    res.status(err.statusCode).json({message:err.message,err})
    return 
  }
  res.status(500).json({ message: "some thing went wrong",err });
  return 
}