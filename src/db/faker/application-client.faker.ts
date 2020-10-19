import faker from 'faker';
/**
 * applicationClientsFaker - for generating for local data
 *
 * @return {<Array>}  { list of available api keys for client per application }
*/
export const applicationClientsFaker = () => {
  const applicationClientsFaker: any = [];
  for (var i = 0; i <= 2; i++) {
    applicationClientsFaker.push({
      name: faker.commerce.product(),
      key: faker.random.alphaNumeric(30),
      platform: faker.random.uuid(),
    });
  }

  return applicationClientsFaker;
};
