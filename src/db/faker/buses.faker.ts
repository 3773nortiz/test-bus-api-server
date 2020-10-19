import faker from 'faker';
/**
 * busesFaker - for generating for local data
 *
 * @return {<Array>}  { list of buses }
*/
export const busesFaker = () => {
  const busesFaker: any = [];
  for (var i = 0; i <= 20; i++) {
    // for generating random lat & long
    const lat = faker.address.latitude();
    const lng =  faker.address.longitude();
    
    busesFaker.push({
      name: `Bus-10${i}`,
      plateNumber: faker.random.alphaNumeric(8).toUpperCase(),
      contactNumber: faker.phone.phoneNumber(),
      ping_latitude: lat,
      ping_longitude: lng
    });
  }

  return busesFaker;
};
