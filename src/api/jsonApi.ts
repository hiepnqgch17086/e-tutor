import Axios, { AxiosResponse, AxiosInstance } from "axios";
import { getLocalStorageToken } from "../routes";

export default class JsonApi {
  protected ApiRef: AxiosInstance

  public isMainApi: boolean = false

  public setHeader() {
    this.ApiRef.interceptors.request.use(
      (config) => {
        const token = getLocalStorageToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        config.headers['Content-Type'] = 'application/json'
        return config
      },
      (err) => {
        return Promise.reject(err)
      }
    )
  }

  constructor(baseURL: string = 'http://localhost:3001') {
    this.ApiRef = Axios.create({
      baseURL
    })
  }

  //////////////USERS////////////////
  getAuthToken({ email = '', password = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.get('/users/u1')
  }
  setMyPasswordUpdate(userSnapshot: Object): Promise<AxiosResponse<any>> {
    throw new Error('sdfd')
  }
  ////////// CLASSES /////////////
} 
