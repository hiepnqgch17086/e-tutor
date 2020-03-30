import { AxiosResponse } from "axios";
import { PaginationType } from "../models-one-entity/types";
import { getLocalStorageAuthIdToken } from "../routes";
import { IS_STUDENT, IS_TUTOR } from "../models-one-prop/role";
import { User } from "./types";
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

} 
