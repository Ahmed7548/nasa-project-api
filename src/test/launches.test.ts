import { doesNotMatch } from "assert";
import request from "supertest";
import server from "../app";

describe("GET/launches", () => {
	test("it should respond with 200 status code", async () => {
		await request(server)
			.get("/api/launch")
			.expect("Content-Type", /json/)
			.expect(200);
	});
});

describe("POST/launches", () => {
	test("it should respond with 200 status code", () => {});
});

afterAll((done) => {
	server.close();
	done();
});
