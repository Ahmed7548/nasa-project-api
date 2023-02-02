import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { openDb } from "./db";

import { createPath } from "../helpers/path";

export default async () => {
	const records: any[] = [];
	createReadStream(createPath("public","csv", "kepler_data.csv"))
		.pipe(parse({ comment: "#", columns: true }))
		.on("data", (record) => {
			if (isHabitable(record)) records.push(record);
		})
		.on("end", async () => {
			const db = await openDb();
			try {
				await db.exec("DROP TABLE IF EXISTS Planets;");
				await db.exec(`create table if not exists Planets(
				ID INTEGER PRIMARY KEY AUTOINCREMENT,
				kepid INT NOT NULL,
				name TEXT NOT NULL
				);
				`);
				await db.exec(`create table if not exists Launches (
					ID INTEGER PRIMARY KEY AUTOINCREMENT,
					date TEXT NOT NULL,
					name TEXT UNIQUE NOT NULL,
					rocketType TEXR NOT NULL,
					destination INTEGER,
					FOREIGN KEY(destination) REFERENCES Planets(ID)
				)`);
				await db.exec(`BEGIN TRANSACTION;
			${records
				.map(
					(record) =>
						`	INSERT INTO Planets (kepid, NAME) VALUES ('${record.kepid}', '${record.kepler_name}');`
				)
				.join("\n")}
			COMMIT;`);
			} catch (err) {
				console.error(err);
			} finally {
				db.close();
			}
		})
		.on("err", (error) => console.error(error));

	function isHabitable(planet: { [key: string]: any }): boolean {
		return (
			planet["koi_disposition"] === "CONFIRMED" &&
			planet["koi_insol"] > 0.36 &&
			planet["koi_insol"] < 1.11 &&
			planet["koi_prad"] < 1.6
		);
	}
};
