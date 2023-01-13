import { RequestHandler } from "express";
import Launch from "../models/launches";
interface ReqBody {
	date: string;
	name: string;
	rocketType: string;
	destination: number;
}

export const postLaunch: RequestHandler<any, any, ReqBody> = async (
	req,
	res,
	next
) => {
	const { date, destination, name, rocketType } = req.body;

	const launch = new Launch(date, name, rocketType, destination);

	const id = await launch.save();

	if (id) {
		res.status(200).json({ id });
		return;
	}
	res.status(500).json({ error: "couldn't save to data base" });
};
