import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";
import { SIGN_IN_PAGE, getLocalStorageToken } from "../routes";
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000'
})

axiosInstance.interceptors.request.use(
  async (config) => {
    const token = getLocalStorageToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  }
)

export default class MainApi {

  constructor() { }

  //////////////USERS////////////////
  /**
   * @override
   */
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    // console.log('email', password)
    return axiosInstance.post('/login', {
      email,
      password,
    })
  }
  getMyProfile(): Promise<AxiosResponse<any>> {
    return axiosInstance.get('/my-profile', {
    })
  }
  setMyPasswordUpdate({ password = '' }): Promise<AxiosResponse<any>> {
    return axiosInstance.put(`/users`, password)
  }
}
