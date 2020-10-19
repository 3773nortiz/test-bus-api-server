import "reflect-metadata";

import { seedApplicationClients } from "../db/seeds/application-clients.seed";
import { seedBusSchedules } from "../db/seeds/bus-schedules.seed";
import { seedBusStops } from "../db/seeds/bus-stops.seed";
import { seedBuses } from "../db/seeds/buses.seed";

import { success, error } from "../helpers/status-codes";
import { APIGatewayProxyEvent } from "aws-lambda";

import { getConnection } from "../db/config";

export const seed = async (event: APIGatewayProxyEvent) => {
	const { tables } = event.queryStringParameters ?? {};
	const result: any = {};

	let entities = tables.split(",");

	if (tables === "*") {
		const { connection } = await getConnection();
		const queryRunner = connection.createQueryRunner();

		await queryRunner.dropDatabase(process.env.DB_NAME ?? "");
		await queryRunner.createDatabase(process.env.DB_NAME ?? "");

		await connection.synchronize();
		entities = ["bus_stops", "buses", 'bus_schedules', "application_clients"];
	}

	if (entities.includes("bus_stops")) result.busStops = await seedBusStops();
	if (entities.includes("buses")) result.buses = await seedBuses();
	if (entities.includes("bus_schedules")) result.busSchedules = await seedBusSchedules();
	if (entities.includes("application_clients")) result.applicationClients = await seedApplicationClients();
	return success(result);
};

export const sync = async () => {
	try {
		const { connection } = await getConnection();
		await connection.synchronize();
		return success();
	} catch (error_) {
		return error(error_);
	}
};