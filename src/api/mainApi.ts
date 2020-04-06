import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";
import { Response } from "../models-one-entity/types";

export const ApiURL = 'http://localhost:4000'

export default class MainApi extends JsonApi {

  constructor() {
    super(ApiURL)
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
  getStudentsOfTutor({ limit = 1, page = 1, textContains = '' }): Promise<AxiosResponse<any>> {
    return this.ApiRef.get(`/users/students-of-tutor?limit=${limit}&page=${page}&textContains=${textContains}`)
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
  async getEmailsOfAuth({ limit = 1, page = 1 }): Promise<Response> {
    const { data: { emailsOfAuth, errorMessage } } = await this.ApiRef.get(`/emails/of-auth?limit=${limit}&page=${page}`)
    return {
      data: emailsOfAuth,
      errorMessage
    }
  }
  async getEmail(emailId: number): Promise<Response> {
    const { data: { email, errorMessage } } = await this.ApiRef.get(`/emails/${emailId}`)
    return {
      data: email,
      errorMessage
    }
  }

  ////////////// ROOM///////////
  async getRoomMessagesOfStudentAuth(): Promise<Response> {
    const { data: { room, tutorId, errorMessage } } = await this.ApiRef.get(`/rooms/messages-of-student-auth`)
    room.studentId = {}
    room.studentId.tutorId = tutorId
    return {
      data: room,
      errorMessage
    }
  }
  async getRoomsOfTutorAuth(text = ''): Promise<Response> {
    const { data: { rooms, errorMessage } } = await this.ApiRef.get(`/rooms/of-tutor-auth?text=${text}`)
    // room.studentId = {}
    // room.studentId.tutorId = tutorId
    return {
      data: rooms,
      errorMessage
    }
  }


  //////// MESSAGE //
  async setMessageInRoom({ roomId = 0, text = '' }): Promise<Response> {
    const { data: { errorMessage } } = await this.ApiRef.post(`/messages/created-in-room/${roomId}`, { text })
    return {
      errorMessage
    }
  }
  async getMessagesInRoom({ roomId = 0 }): Promise<Response> {
    const { data: { messages, errorMessage } } = await this.ApiRef.get(`/messages/in-a-room/${roomId}`)
    return {
      errorMessage, data: { messages }
    }
  }

  //////////MEETING
  async setMeetingNew(snapshot: any): Promise<Response> {
    const body = {
      ...snapshot, studentId: snapshot.studentId.id
    }
    // console.log(ss)
    const { data: { errorMessage } } = await this.ApiRef.post(`/meetings`, body)
    return {
      errorMessage
    }
  }
  async setMeetingUpdate(id: number, snapshot: any): Promise<Response> {
    const body = {
      meeting: snapshot
    }
    // console.log(ss)
    const { data: { errorMessage } } = await this.ApiRef.put(`/meetings/${id}`, body)
    return {
      errorMessage
    }
  }
  async getMeetings({
    fromAt, toAt
  }: any): Promise<Response> {
    const fromAtZ = new Date(fromAt).toISOString()
    const toAtZ = new Date(toAt).toISOString()
    const { data: { meetings, errorMessage } } = await this.ApiRef.get(`/meetings?fromAt=${fromAtZ}&toAt=${toAtZ}`)
    return {
      data: { meetings },
      errorMessage
    }
  }
  async getMeeting(id: number): Promise<Response> {
    const { data: { meeting, errorMessage } } = await this.ApiRef.get(`/meetings/${id}`)
    return {
      data: { meeting },
      errorMessage,
    }
  }


  //////////MEETING
  async setCommentNew(snapshot: object): Promise<Response> {
    // @ts-ignore
    const meetingId = snapshot.meetingId.id
    const { data: { errorMessage } } = await this.ApiRef.post(`/comments/meeting/${meetingId}`, {
      comment: snapshot
    })
    return {
      errorMessage,
    }
  }
}
