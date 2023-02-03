import { RequestHandler } from "express";
import Launch from "../models/launches";
import type { LaunchData } from "../schemas/postLaunch";

export const postLaunch: RequestHandler<any, any, LaunchData> = async (
	req,
	res,
	next
) => {
	const { date, destination, name, rocketType } = req.body;
	// validation could be done with json schema validators


	const launch = new Launch(date, name, rocketType, destination);

	const response = await launch.save();

	if (response.saved) {
		res.status(200).json({ id: response.id });
		return;
	} else {
		res.status(response.satus).json({ message: response.message });
		return;
	}
};
