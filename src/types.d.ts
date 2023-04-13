import { RequestHandler } from "express";

 export type ErrorResponse={
  message: string;
  err?: any;

}
export type ResType<T> = T | ErrorResponse


export type  CustomRequestHandler<ResBody=any,ReqBody=any,ReqQuery=any>=RequestHandler<any,ResType<ResBody>,ReqBody,ReqQuery>

