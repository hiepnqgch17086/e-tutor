import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";
import { PaginationType } from "../models-one-entity/types";


export default class MainApi extends JsonApi {

  constructor() {
    super('http://localhost:4000')
  }

  //////////////USERS////////////////
  /**
   * @override
   */
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    // console.log('email', password)
    return this.ApiRef.post('/login', {
      email,
      password,
    })
  }
  getMyProfile(): Promise<AxiosResponse<any>> {
    return this.ApiRef.get('/my-profile', {
    })
  }
  setMyPasswordUpdate({ oldPassword = '', newPassword = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.put(`/change-my-password`, {
      oldPassword,
      newPassword,
    })
  }
  getStudentUsers({ limit, page, emailContains }: any): Promise<AxiosResponse<any>> {
    return this.ApiRef.get(`/users/students?limit=${limit}&page=${page}&emailContains=${emailContains}`)
  }
  getStudentUsersWhoHaveNotTutor({ limit, page, emailContains }: any): Promise<AxiosResponse<any>> {
    return this.ApiRef.get(`/users/tutors?limit=${limit}&page=${page}&emailContains=${emailContains}`)
  }
}
