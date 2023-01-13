import { RequestHandler } from "express";
import Launch from "../models/launches";



export const getLaunches: RequestHandler =async (req, res, nex) => { 
  const launches = await Launch.getAll()
  res.status(200).json(launches)
}