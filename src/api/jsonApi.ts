import ApiModel from "./apiModel";
import { AxiosResponse } from "axios";
import { PaginationType } from "../models-one-entity/types";
import { getLocalStorageAuthIdToken } from "../routes";

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
   * @override
   */
  getUser(id: string | number) {
    return this.ApiRef.get(`/users/${id}`)
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
  getMyProfile() {
    const id = getLocalStorageAuthIdToken()
    return this.ApiRef.get(`/users/${id}`)
  }
  /**
   * @override
   */
  setUserUpdateProfile(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id = 'any' } = userSnapshot
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
} 
