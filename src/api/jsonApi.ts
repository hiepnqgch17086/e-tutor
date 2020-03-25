import ApiModel from "./apiModel";
import { AxiosResponse } from "axios";
import { PaginationType } from "../models-one-entity/types";

type User = {
  id?: string | number
}

export default class JsonApi extends ApiModel {

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
   * 
   * @override
   */
  getUsers({ page = 1, limit = 5, email = '' }: PaginationType) {
    let url = `/users?_page=${page}&_limit=${limit}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }


  /**
   * @override
   */
  setUserUpdateProfile(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id = 'any' } = userSnapshot
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
} 
