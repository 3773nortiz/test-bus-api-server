import { busesFaker } from "../faker/buses.faker";
import { getConnection } from "../config";
import { Buses } from "../entities/Buses";
/**
 * seedBuses - save list of fake data created for buses to the collection
 *
 * @return     {<Object> Buses }  { list of buses from collection }
 */
export const seedBuses = async (count: number = 1) => {
  const { busDb } = await getConnection();
  await busDb.delete({});

  const buses: Buses[] = [];
  const seedData = busesFaker();

  for (const bus of seedData) {
    const { name, plateNumber, contactNumber, ping_latitude, ping_longitude } = bus;

    const busObject = new Buses();
    busObject.name = name;
    busObject.plateNumber = plateNumber;
    busObject.contactNumber = contactNumber;
    busObject.ping_latitude = ping_latitude;
    busObject.ping_longitude = ping_longitude;

    buses.push(busObject);
  }

  const result = await busDb.save(buses);
  return result;
};