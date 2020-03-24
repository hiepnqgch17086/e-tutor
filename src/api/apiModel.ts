import axios, { AxiosInstance, AxiosResponse } from 'axios'

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
  getUsers() {
    throw new Error('!override getUsers()')
  }
  getUsersByEmail(email: string) {
    throw new Error('!override getUsersByEmail()')
  }
  // update profile without password
  setUserUpdateProfile(userSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('!override setUserUpdateProfile()')
  }
}

export default ApiModel
