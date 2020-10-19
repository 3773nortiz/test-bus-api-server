import faker from 'faker';
/**
 * busStopsFaker - for generating for local data
 *
 * @return {<Array>}  { list of bus stops data }
*/
export const busStopsFaker = () => {
  const busStopsFaker: any = [];
  for (var i = 0; i <= 20; i++) {
    // this is set for me Davao Lat & Lng
    const lat = parseFloat(`7.12333${i}`);
    const lng = parseFloat(`125.233${i}`);
    const coordinates = [lat, lng];
    // for generating random lat & lng
    // const lat = faker.address.latitude();
    // const lng =  faker.address.longitude();
    
    busStopsFaker.push({
      name: faker.lorem.words(),
      description: faker.lorem.paragraphs(),
      location: coordinates,
    });
  }

  return busStopsFaker;
};
