import { RequestHandler } from "express";

import { Promisfy } from "../types";

export default <T extends Promisfy<RequestHandler>>(asyncfn: T): RequestHandler => {
  return async (req, res, next) => {
    asyncfn(req, res, next).catch(next)
  }
}