import { applicationClientsFaker } from "../faker/application-client.faker";
import { getConnection } from "../config";
import { ApplicationClients } from "../entities/ApplicationClients";
/**
 * seedBuses - save list of fake data created for buses to the collection
 *
 * @return     {<Object> Buses }  { list of buses from collection }
 */
export const seedApplicationClients = async (count: number = 1) => {
  const { applicationClientDb } = await getConnection();
  await applicationClientDb.delete({});

  const applicationClients: ApplicationClients[] = [];
  const seedData = applicationClientsFaker();

  for (const applicationClient of seedData) {
    const { name, key, platform } = applicationClient;

    const appClientObject = new ApplicationClients();
    appClientObject.name = name;
    appClientObject.key = key;
    appClientObject.platform = platform;

    applicationClients.push(appClientObject);
  }

  const result = await applicationClientDb.save(applicationClients);
  return result;
};