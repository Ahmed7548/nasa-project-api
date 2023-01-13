import { RequestHandler } from "express";
import Launch from "../models/launches";

interface ReqBody {
	id: number;
}

export const deleteLaunche: RequestHandler<any, any, ReqBody> = async (
	req,
	res,
	next
) => {
	const { id } = req.body;

	if (await Launch.delete(id)) {
		res.status(200).json({ msg: "launch aborted" });
		return;
	}
	res.status(400).json({ msg: "there is no launch with that id" });
};
