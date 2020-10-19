import { getConnection } from '../db/config';

export default class Authenticate {
  protected headers: any;
  /**
   * Constructs a new instance.
   *
   * @class      ClassName (Authenticate)
   * @param      {any}  apiHeaders  headers from the api request
  */
  constructor(apiHeaders: any) {
    this.headers = apiHeaders;
    console.log(this.headers);
  }
  /**
   * [authorizeApiKey this will check if api has an header `x-api-key` and allow user to access api request ]
  */
  public async authorizeApiKey(): Promise<boolean> {
    const ApiKey = this.headers?.['x-api-key'] || '';
    console.log(ApiKey);
    
    const { applicationClientDb } = await getConnection();
    let hasAccessToApi: boolean = false;

    if (ApiKey) {
      const applicationClientDetails = await applicationClientDb.findOne({ key: ApiKey });
      if (applicationClientDetails) hasAccessToApi = true;
    } 
    return hasAccessToApi;
  }
}

