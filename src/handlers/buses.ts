import { getConnection } from "../db/config";
import Authenticate from '../middleware/authenticate';
import { success, unauthorised } from '../helpers/status-codes';

export const getBuses = async (event, context) => {
  const auth = new Authenticate(event.headers);
  const authorised = await auth.authorizeApiKey();
  if (!authorised) return unauthorised();

  const { limit, page } = event.queryStringParameters ?? {};
  const take = Number(limit) || 10
  const skip = Number(page) || 0

  const { busDb } = await getConnection();
  const [data, count] = await busDb.findAndCount({ take, skip });

  return success({
    count,
    data
  });
};