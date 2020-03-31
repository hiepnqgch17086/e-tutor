import Axios, { AxiosInstance } from "axios";
import { getLocalStorageToken } from "../routes";

export default class JsonApi {
  protected ApiRef: AxiosInstance

  public isMainApi: boolean = false

  constructor(baseURL: string = 'http://localhost:3001') {
    this.ApiRef = Axios.create({
      baseURL
    })

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

} 
