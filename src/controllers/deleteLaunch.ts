import { RequestHandler } from "express";
import { CustomRequestHandler } from "../types";
import Launch from "../models/launches";
import HttpError from "../errors/HttpError";

interface ReqBody {
	id: number;
}

interface Response {
	message:string
}

export const deleteLaunche: CustomRequestHandler<Response, ReqBody> = async (
	req,
	res,
	next
) => {
	const { id } = req.body;

	if (await Launch.delete(id)) {
		res.status(200).json({ message: "launch aborted successfully" });
		return;
	}
	next(new HttpError(400,"there is no launch with that id"))
};
