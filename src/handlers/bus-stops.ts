import { getConnection } from "../db/config";
import Authenticate from "../middleware/authenticate";
import {
  unauthorised,
  success,
  badRequest,
  notFound,
} from "../helpers/status-codes";
import MESSAGES from "../constants/api-messages";
import moment from "moment";
import WEEKDAYS from "../constants/weekdays";
import { ObjectID } from 'mongodb';
import { BusStops } from "../db/entities/BusStops" 
/**
 * getBusStops - Get available bus stops near me
 * query parameters required lat & lng
 * @return  {Object <BusStops>}  lists of bus stops.
 */
export const getBusStops = async (event: any, context: any) => {
  const MAX_DISTANCE = 5;

  // check authorization
  // @TODO
  // should move in middleware
  const auth = new Authenticate(event.headers);
  const authorised = await auth.authorizeApiKey();
  return error unauthorised
  if (!authorised) return unauthorised();

  const { lat, lng } = event.queryStringParameters ?? {};

  if (!lat && !lng) {
  return badRequest({
      code: MESSAGES.ERROR.code,
      message: MESSAGES.ERROR.NO_BUS_STOP_LOCATED,
    });
  }

  const { busStopDb } = await getConnection();

  // NOTE: need to identify column location as a geometry points 
  // to make sure no issue related to manual creation of location column
  // @TODO
  // might have a better solution, might change in future
  await busStopDb.createCollectionIndex({ location: '2d' });

  const query = busStopDb.aggregate([
    {
      $geoNear: {
        near: [parseFloat(lat), parseFloat(lng)],
        distanceField: "distance",
        maxDistance: MAX_DISTANCE,
      },
    },
    {
      $limit: 10
    }
  ]);
  const data = await query.toArray();

  return success({
    data,
    code: MESSAGES.NEAREST_BUS_STOPS.code,
    message: MESSAGES.NEAREST_BUS_STOPS.message,
  });
};

/**
 * getBusStopAvailableTime - Get available buses and next arrival time
 * path parameters required id - bus stop id.
 * @return {Object <BusStops>}  lists of bus stops.
 */
export const getBusStopAvailableTime = async (event: any, context: any) => {
  // check authorization
  // 
  // @TODO
  // should move in middleware
  const auth = new Authenticate(event.headers);
  const authorised = await auth.authorizeApiKey();
  if (!authorised) return unauthorised();

  const { id } = event.pathParameters ?? {};
  const { busStopDb, busSchedulesDb } = await getConnection();

  if (!id) {
    return badRequest({
      code: MESSAGES.ERROR.code,
      message: MESSAGES.ERROR.ROUTE_NOT_FOUND,
    });
  }

  console.log(id);

  const busStopQuery = busStopDb.aggregate([
    { 
      $match : { 
        _id : ObjectID(id)
      } 
    }
  ]);

  const busStop = await busStopQuery.toArray();

  if (!busStop) {
    return notFound({
      code: MESSAGES.ERROR.code,
      message: MESSAGES.ERROR.BUS_STOP_NOT_FOUND,
    });
  }

  const now = moment.utc();
  const currentTime = now.format('HH:mm');
  const currentWeekDay = WEEKDAYS[now.day()];
  /**
   * this query will get all list of bus stops 
  */
  const busSchedulesQuery =  busSchedulesDb.aggregate([
    {
      $addFields: {
        timeGte: { $cmp: [ "$time",  currentTime] }
      }
    },
    { 
      $match : { 
        weekday : currentWeekDay,
        busStopId: ObjectID(id)
      } 
    },
    { 
      $lookup:{
        from: "buses",
        localField: "busId",
        foreignField: "_id",
        as: "bus"
      }
    },
    {
      $sort: {
        time: 1
      }
    }
  ]);
  const data = await busSchedulesQuery.toArray();

  return success({
    data,
    code: MESSAGES.AVAILABLE_BUSTOPS.code,
    message: MESSAGES.AVAILABLE_BUSTOPS.message,
  });
};