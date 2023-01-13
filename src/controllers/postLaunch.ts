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

	const response = await launch.save();

	if (response.saved) {
			res.status(200).json({ id:response.id });
		return;
	} else {
		res.status(response.satus).json({message:response.message})
		return;
	}
};
