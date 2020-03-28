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
  // sign in
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    throw new Error('!override getDatabaseToken()')
  }
  getMyProfile(id: string | number): Promise<AxiosResponse<any>> {
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


  ////////// CLASSES /////////////
  setClassNew(classSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setClassNew()')
  }
  getClassesForAdmin(paginationData: PaginationType): Promise<AxiosResponse<any>> {
    throw new Error('!override setClassNew()')
  }
}

export default ApiModel
