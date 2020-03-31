import Axios, { AxiosResponse, AxiosInstance } from "axios";
import { PaginationType } from "../../models-one-entity/types";
import { getLocalStorageToken } from "../../routes";
import { IS_STUDENT, IS_TUTOR } from "../../models-one-prop/role";
import { User } from "../types";

export default class JsonApi {
  protected ApiRef: AxiosInstance

  public isMainApi: boolean = false

  constructor(baseURL: string = 'http://localhost:3001') {
    this.ApiRef = Axios.create({
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
    return this.ApiRef.get('/users/u1')
  }
  getUser(id: string | number): Promise<AxiosResponse<any>> {
    return this.ApiRef.get(`/users/${id}`)
  }
  getUsers({ page = 1, limit = 10, email = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/users?_page=${page}&_limit=${limit}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }
  /**
  * 
  * @override
  */
  getUsersWhoAreStudents({ page = 1, limit = 10, email = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/users?_page=${page}&_limit=${limit}&role=${IS_STUDENT}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }
  /**
  * 
  * @override
  */
  getUsersWhoAreTutors({ page = 1, limit = 10, email = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/users?_page=${page}&_limit=${limit}&role=${IS_TUTOR}`
    if (email) url += `&email=${email}`
    return this.ApiRef.get(url)
  }
  /**
  * 
  * @override
  */
  getMyProfile(): Promise<AxiosResponse<any>> {
    const id = getLocalStorageToken()
    return this.ApiRef.get(`/users/${id}`)
  }
  setUserUpdateProfile(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id } = userSnapshot
    if (!id) throw new Error('Id not exist')
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
  setUserNew(userSnapshot: Object) {
    return this.ApiRef.post(`/users`, userSnapshot)
  }
  setUserUpdateRole(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id } = userSnapshot
    if (!id) throw new Error('Id not exist')
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
  setMyPasswordUpdate(userSnapshot: Object): Promise<AxiosResponse<any>> {
    const id = getLocalStorageToken()
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }

  ////////// CLASSES /////////////

  getClassesForAdmin({ page = 1, limit = 10, title = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/classes?_page=${page}&_limit=${limit}`
    if (title) url += `&title=${title}`
    return this.ApiRef.get(url)
  }
  setClassNew(classSnapshot: Object): Promise<AxiosResponse<any>> {
    return this.ApiRef.post(`/classes`, classSnapshot)
  }
  setUserDelete(id: string | number) {
    return this.ApiRef.delete(`/users/${id}`)
  }


  /////////CLASS_MEMBER ///////////
  setClassMemberNew(classMemberSnapshot: Object): Promise<AxiosResponse<any>> {
    return this.ApiRef.post(`/classMembers`, classMemberSnapshot)
  }
} 
