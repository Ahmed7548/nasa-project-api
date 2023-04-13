import { RequestHandler } from "express";
import Launch from "../models/launches";
import type { LaunchData } from "../schemas/postLaunch";
import { CustomRequestHandler } from "../types";
import HttpError from "../errors/HttpError";

export const postLaunch: CustomRequestHandler<any, LaunchData> = async (
	req,
	res,
	next
) => {
	const { date, destination, name, rocketType } = req.body;


	const launch = new Launch(date, name, rocketType, destination);
	console.log(launch)
	const response = await launch.save();

	if (response.saved) {
		res.status(200).json({ id: response.id });
		return;
	} else {
		next(new HttpError(response.satus,response.message))
		return;
	}
};
