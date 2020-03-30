import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { PaginationType } from '../models-one-entity/types'

class ApiModel {
  protected ApiRef: AxiosInstance

  constructor(baseURL: string) {
    this.ApiRef = axios.create({
      baseURL
    })

    this.ApiRef.interceptors.request.use(
      (config) => {
        // const token = localStorage.getItem('token')
        // if (token) {
        //   config.headers.Authorization = `Bearer ${token}`
        // }
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  //////////////USERS////////////////
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    throw new Error('!override getDatabaseToken()')
  }
  getMyProfile(): Promise<AxiosResponse<any>> {
    throw new Error('!override getUsers()')
  }
  getUser(id: string | number): Promise<AxiosResponse<any>> {
    throw new Error('!override getUsers()')
  }
  getUsers(paginationData: PaginationType): Promise<AxiosResponse<any>> {
    throw new Error('!override getUsers()')
  }
  getUsersWhoAreStudents(paginationData: PaginationType): Promise<AxiosResponse<any>> {
    throw new Error('!override getUsers()')
  }
  getUsersWhoAreTutors(paginationData: PaginationType): Promise<AxiosResponse<any>> {
    throw new Error('!override getUsers()')
  }
  // update profile without password
  setUserUpdateProfile(userSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setUserUpdateProfile()')
  }
  // as signup
  setUserNew(userSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setUserNew()')
  }
  setUserUpdateRole(userSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setUserUpdateRole()')
  }
  setUserDelete(id: string | number): Promise<AxiosResponse<any>> {
    throw new Error('!override setUserDelete()')
  }
  setMyPasswordUpdate(userSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setUserUpdatePassword')
  }


  ////////// CLASSES /////////////
  getClassesForAdmin(paginationData: PaginationType): Promise<AxiosResponse<any>> {
    throw new Error('!override setClassNew()')
  }
  setClassNew(classSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setClassNew()')
  }

  /////////CLASS_MEMBER ///////////
  setClassMemberNew(classMemberSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setClassMember()')
  }
}

export default ApiModel
