import 'reflect-metadata';

import { createConnection, Connection, MongoRepository } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ApplicationClients } from './entities/ApplicationClients';
import { Buses } from './entities/Buses';
import { BusStops } from './entities/BusStops';
import { BusSchedules } from './entities/BusSchedules';


export interface Repositories {
  connection: Connection;
  busStopDb: MongoRepository<BusStops>;
  applicationClientDb: MongoRepository<ApplicationClients>;
  busDb: MongoRepository<Buses>;
  busSchedulesDb: MongoRepository<BusSchedules>;
}

let connection: Connection; // connection variable to connect to database driver

export const getConnection = async (): Promise<Repositories> => {
 
  if (!connection || !connection.isConnected) {
    connection = await createConnection({
      type: "mongodb",
      useNewUrlParser: true,
      url: `${process.env.DB_PROTOCOL}://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
      synchronize: true,
      logging: true,
      entities: [
        BusStops,
        ApplicationClients,
        Buses,
        BusSchedules
      ]
    });

    console.log(`Connect database successfully!`);
  }
  return {
    connection,
    busStopDb: connection.getMongoRepository(BusStops),
    applicationClientDb: connection.getMongoRepository(ApplicationClients),
    busDb: connection.getMongoRepository(Buses),
    busSchedulesDb: connection.getMongoRepository(BusSchedules)
  };
};