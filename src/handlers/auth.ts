import { getConnection } from '../db/config';
/**
 * [authorizeApiKey this will check if api has an header `x-api-key` and allow user to access api request ]
*/
export const authenticate = async (event: any, context: any) => {
  const ApiKey = event.headers?.['x-api-key'] || '';

  const { applicationClientDb } = await getConnection();
  let hasAccessToApi: boolean = false;

  if (ApiKey) {
    const applicationClientDetails = await applicationClientDb.findOne({ key: ApiKey });
    if (applicationClientDetails) hasAccessToApi = true;
  } 
  return hasAccessToApi;
}