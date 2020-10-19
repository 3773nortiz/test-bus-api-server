import { getConnection } from "../config";
import { BusSchedules } from "../entities/BusSchedules";
import faker from "faker";
import moment from "moment";

export const seedBusSchedules = async () => {
  const { busDb, busStopDb, busSchedulesDb } = await getConnection();
  await busSchedulesDb.delete({});

  const queryBuses = busDb.aggregate([{ $limit: 20 }]);
  const buses = await queryBuses.toArray();

  const queryBusStops = await busStopDb.aggregate([{ $limit: 20 }]);
  const busStops = await queryBusStops.toArray();
  

  const busSchedules: BusSchedules[] = [];

  const startTime = moment().hours(0).minutes(0);
  for (const bus of buses) {
    for (const busStop of busStops) {
      startTime.add(15, 'minutes');

      const busScheduleObject = new BusSchedules();
      busScheduleObject.weekday = faker.date.weekday();
      busScheduleObject.busId = bus._id;
      busScheduleObject.busStopId = busStop._id;
      busScheduleObject.time = startTime.format('HH:mm');
      
      busSchedules.push(busScheduleObject);
    }
  }

  const result = await busSchedulesDb.save(busSchedules);

  return result;
};