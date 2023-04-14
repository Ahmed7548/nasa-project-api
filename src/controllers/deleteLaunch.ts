import { RequestHandler } from "express";
import { CustomRequestHandler } from "../types";
import Launch from "../models/launches";
import HttpError from "../errors/HttpError";
import catchAsyncError from "../helpers/catchAsyncError";

interface ReqBody {
	id: number;
}

interface Response {
	message:string
}

export const deleteLaunche =catchAsyncError<CustomRequestHandler<Response, ReqBody>>( async (
	req,
	res,
	next
) => {
	const { id } = req.body;

	if (await Launch.delete(id)) {
		res.status(200).json({ message: "launch aborted successfully" });
		return;
	}
	throw new HttpError(400,"there is no launch with that id")
})
