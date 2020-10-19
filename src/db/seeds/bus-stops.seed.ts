import { busStopsFaker } from '../faker/bus-stops.faker';
import { getConnection } from '../config';
import { BusStops } from '../entities/BusStops';
/**
 * seedBusStops - save list of fake data created for bus stop to the collection
 *
 * @return     {<Object> BusStop }  { list of bus stops from collection }
*/
export const seedBusStops = async (count: number = 1) => {
  const { busStopDb } = await getConnection();
  await busStopDb.delete({});

  const busStops: BusStops[] = [];
  const seedData = busStopsFaker();

  for (const busStop of seedData) {
    const { name, description, location } = busStop;

    const busStopObject = new BusStops();
    busStopObject.name = name;
    busStopObject.description = description;
    busStopObject.location = location;

    busStops.push(busStopObject);
  }

  const result = await busStopDb.save(busStops);
  return result;
};
