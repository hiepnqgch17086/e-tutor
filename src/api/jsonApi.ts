import ApiModel from "./apiModel";
import { AxiosResponse } from "axios";
import { PaginationType } from "../models-one-entity/types";
import { getLocalStorageAuthIdToken } from "../routes";
import { IS_STUDENT, IS_TUTOR } from "../models-one-prop/role";

type User = {
  id?: string | number,
  role?: string | number,
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
   * @override
   */
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
    const id = getLocalStorageAuthIdToken()
    return this.ApiRef.get(`/users/${id}`)
  }
  /**
   * @override
   */
  setUserUpdateProfile(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id } = userSnapshot
    if (!id) throw new Error('Id not exist')
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
  /**
   * @override
   */
  setUserNew(userSnapshot: Object) {
    return this.ApiRef.post(`/users`, userSnapshot)
  }
  /**
   * @override
   */
  setUserUpdateRole(userSnapshot: User): Promise<AxiosResponse<any>> {
    const { id } = userSnapshot
    if (!id) throw new Error('Id not exist')
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }
  /**
   * @override
   */
  setMyPasswordUpdate(userSnapshot: Object): Promise<AxiosResponse<any>> {
    const id = getLocalStorageAuthIdToken()
    return this.ApiRef.put(`/users/${id}`, userSnapshot)
  }

  ////////// CLASSES /////////////

  /**
   * @override
   */
  getClassesForAdmin({ page = 1, limit = 10, title = '' }: PaginationType): Promise<AxiosResponse<any>> {
    let url = `/classes?_page=${page}&_limit=${limit}`
    if (title) url += `&title=${title}`
    return this.ApiRef.get(url)
  }
  /**
   * @override
   */
  setClassNew(classSnapshot: Object): Promise<AxiosResponse<any>> {
    return this.ApiRef.post(`/classes`, classSnapshot)
  }
  /**
   * @override
   */
  setUserDelete(id: string | number) {
    return this.ApiRef.delete(`/users/${id}`)
  }


  /////////CLASS_MEMBER ///////////
  /**
   * @override
   */
  setClassMemberNew(classMemberSnapshot: Object): Promise<AxiosResponse<any>> {
    return this.ApiRef.post(`/classMembers`, classMemberSnapshot)
  }
} 
