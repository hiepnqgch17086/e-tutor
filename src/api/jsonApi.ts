import ApiModel from "./apiModel";
import { AxiosResponse } from "axios";
import { PaginationType } from "../models-one-entity/types";
import { getLocalStorageAuthIdToken } from "../routes";
import { IS_STUDENT, IS_TUTOR } from "../models-one-prop/role";

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
  getUser(id: string | number): Promise<AxiosResponse<any>> {
    return this.ApiRef.get(`/users/${id}`)
  }
  /**
   * 
   * @override
   */
  getUsers({ page = 1, limit = 10, email = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/users?_page=${page}&_limit=${limit}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }
  getUsersWhoAreStudents({ page = 1, limit = 10, email = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/users?_page=${page}&_limit=${limit}&role=${IS_STUDENT}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }
  getUsersWhoAreTutors({ page = 1, limit = 10, email = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/users?_page=${page}&_limit=${limit}&role=${IS_TUTOR}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }
  getMyProfile(): Promise<AxiosResponse<any>> {
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
