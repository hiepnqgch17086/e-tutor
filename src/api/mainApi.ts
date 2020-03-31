import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";

export default class MainApi extends JsonApi {

  constructor() {
    super('http://localhost:4000')
  }

  //////////////USERS////////////////
  /**
   * @override
   */
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.post('/login', {
      email, password
    })
  }
  /**
   * @override
   */
  setMyPasswordUpdate({ password = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.put(`/users`, password)
  }

} 
