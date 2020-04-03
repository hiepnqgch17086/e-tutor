import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";
import { PaginationType, Response } from "../models-one-entity/types";


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
    return this.ApiRef.get(`/users/students-have-not-tutor?limit=${limit}&page=${page}&emailContains=${emailContains}`)
  }
  getTutorUsers({ limit, page, emailContains }: any): Promise<AxiosResponse<any>> {
    return this.ApiRef.get(`/users/tutors?limit=${limit}&page=${page}&emailContains=${emailContains}`)
  }
  async setTutorOfStudent(studentId: string | number = 0, tutorId: string | number = 0): Promise<Response> {
    const { data: { errorMessage } } = await this.ApiRef.put('/users/set-tutor-for-student', {
      studentId,
      tutorId
    })
    return {
      errorMessage
    }
  }


  /////////////EMAILS///////////////
  async getUnReadEmailsOfAuth(): Promise<Response> {
    const { data: { unReadEmailsOfAuth, errorMessage } } = await this.ApiRef.get('/emails/unread-of-auth')
    return {
      data: unReadEmailsOfAuth,
      errorMessage
    }
  }
}
