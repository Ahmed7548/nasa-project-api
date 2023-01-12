import path from "path";

export const createPath = (...paths: string[]): string => {
	const baseDirectory = __dirname.split("\\");
	baseDirectory.pop();
	baseDirectory.pop();

	return path.join(...baseDirectory, ...paths);
};
