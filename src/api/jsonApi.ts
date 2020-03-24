import ApiModel from "./apiModel";
import Axios, { AxiosResponse } from "axios";

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
  getUsers() {
    return this.ApiRef.get('/users')
  }
  /**
   * 
   * @override
   */
  getUsersByEmail(email: string) {
    return this.ApiRef.get(`/users/?email=${email}`)
  }
  /**
   * @override
   */
  setUserUpdateProfile(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id = 'any' } = userSnapshot
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
} 
