import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";

export default class MainApi extends JsonApi {

  constructor() {
    super('http://localhost:3001')
  }

  //////////////USERS////////////////
  /**
   * @override
   */
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.get('/users/u1')
  }
  /**
   * @override
   */
  setMyPasswordUpdate({ password = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.put(`/users`, password)
  }

} 
