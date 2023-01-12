import { createReadStream } from "fs";
import { parse } from "csv-parse";
import { openDb } from "./db";

import { createPath } from "../helpers/path";

// class IsHabitable extends Transform {
// 	constructor(options?: TransformOptions) {
// 		super(options);
// 	}
// 	async _transform(
// 		planet: { [key: string]: any },
// 		encoding: BufferEncoding,
// 		callback: TransformCallback
// 	): Promise<void> {
// 		if (
// 			planet["koi_disposition"] === "CONFIRMED" &&
// 			planet["koi_insol"] > 0.36 &&
// 			planet["koi_insol"] < 1.11 &&
// 			planet["koi_prad"] < 1.6
// 		) {
// 			const db = await openDb();
// 			await db.exec(
// 				`	INSERT INTO Planets (kepid, NAME) VALUES ('${planet.kepid}', '${planet.kepoi_name}');`
// 			);
// 			await db.close();
// 			callback(null);
// 		}
// 		callback(null);
// 	}
// }

export default async () => {
	const records: any[] = [];
	createReadStream(createPath("csv", "kepler_data.csv"))
		.pipe(parse({ comment: "#", columns: true }))
		.on("data", (record) => {
			if (isHabitable(record)) records.push(record);
		})
		.on("end", async () => {
			const db = await openDb();
			// console.log(records[0])
			try {
				await db.exec("DROP TABLE IF EXISTS Planets;");
				await db.exec(`CREATE TABLE Planets(
				ID INTEGER PRIMARY KEY AUTOINCREMENT,
				kepid INT NOT NULL,
				NAME TEXT NOT NULL
				);
				`);
				await db.exec(`BEGIN TRANSACTION;
			${records
				.map(
					(record) =>
						`	INSERT INTO Planets (kepid, NAME) VALUES ('${record.kepid}', '${record.kepoi_name}');`
				)
				.join("\n")}
			COMMIT;`);
			} catch (err) {
				console.log(err);
			} finally {
				const data = await db.all("select * from Planets");
				console.log(data);
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
