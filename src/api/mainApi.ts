import { AxiosResponse } from "axios";
import JsonApi from "./jsonApi";
import { Response } from "../models-one-entity/types";

export const mainWebsocketURL = 'ws://localhost:4000'
export const mainHttpURL = 'http://localhost:4000'

export default class MainApi extends JsonApi {

  constructor() {
    super(mainHttpURL)
  }

  //////////////USERS////////////////
  async getStudentNotInteractive({
    textContains,
    limit,
    page,
    numberOfDays,
  }: any): Promise<Response> {
    const { data: { studentsWhoNotInteractive, errorMessage } } = await this.ApiRef.get(`/users/students-who-not-interactive?numberOfDays=${numberOfDays}&page=${page}&limit=${limit}&textContains=${textContains}`)
    return {
      data: { studentsWhoNotInteractive },
      errorMessage
    }
  }
  async getTotalOfStudents(): Promise<Response> {
    const { data: { totalOfStudents, errorMessage } } = await this.ApiRef.get(`/users/total-of-students`)
    return {
      data: { totalOfStudents },
      errorMessage
    }
  }
  async getTotalOfTutors(): Promise<Response> {
    const { data: { totalOfTutors, errorMessage } } = await this.ApiRef.get(`/users/total-of-tutors`)
    return {
      data: { totalOfTutors },
      errorMessage
    }
  }
  async getTop10StudentsMessageToThisTutor(tutorId: number): Promise<Response> {
    const { data: { students, errorMessage } } = await this.ApiRef.get(`/users/${tutorId}/get-top10-students-message-to-this-tutor`)
    return {
      data: { students },
      errorMessage
    }
  }
  async getTop10StudentsMeetingToThisTutor(tutorId: number): Promise<Response> {
    const { data: { students, errorMessage } } = await this.ApiRef.get(`/users/${tutorId}/get-top10-students-meeting-to-this-tutor`)
    return {
      data: { students },
      errorMessage
    }
  }
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
  async getUserProfile(userId: number): Promise<Response> {
    const { data: { user, errorMessage } } = await this.ApiRef.get(`/users/${userId}/profile`)
    return {
      data: { user },
      errorMessage
    }
  }
  async getUserTotalOfMessages(id: number): Promise<Response> {
    const { data: { totalOfMessages, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-messages`)
    return {
      data: { totalOfMessages },
      errorMessage
    }
  }
  async getUserTotalOfMeetingFileUploads(id: number): Promise<Response> {
    const { data: { totalOfMeetingFileUploads, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-meeting-file-uploads`)
    return {
      data: { totalOfMeetingFileUploads },
      errorMessage
    }
  }
  async getUserTotalOfMessagesInNumberOfDays(id: number, numberOfDays: number): Promise<Response> {
    const { data: { totalOfMessagesInNumberOfDays, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-messages-in-number-of-days/${numberOfDays}`)
    return {
      data: { totalOfMessagesInNumberOfDays },
      errorMessage
    }
  }
  async getUserTotalOfComments(id: number): Promise<Response> {
    const { data: { totalOfComments, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-comments`)
    return {
      data: { totalOfComments },
      errorMessage
    }
  }
  async getUserTotalOfEmails(id: number): Promise<Response> {
    const { data: { totalOfEmails, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-emails`)
    return {
      data: { totalOfEmails },
      errorMessage
    }
  }
  async getStudentTotalOfMeetings(id: number): Promise<Response> {
    const { data: { totalOfMeetings, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-meetings-of-student`)
    // console.log(totalOfMeetings)
    return {
      data: { totalOfMeetings },
      errorMessage
    }
  }
  async getTutorTotalOfMeetings(id: number): Promise<Response> {
    const { data: { totalOfMeetings, errorMessage } } = await this.ApiRef.get(`/users/${id}/total-of-meetings-of-tutor`)
    // console.log(totalOfMeetings)
    return {
      data: { totalOfMeetings },
      errorMessage
    }
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
  async setMessageUpdateStatus_isSeenByPartner_true(messageId: number): Promise<Response> {
    const { data: { errorMessage } } = await this.ApiRef.put(
      `/messages/${messageId}/update-status/is-seen-by-partner-true`)
    return {
      errorMessage
    }
  }
  // async getTotalOfMessagesOfUser(id: number = 0)

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
  async setMeetingUpdateIsOnOrOff(id: number, isOn: boolean = false): Promise<Response> {
    const { data: { errorMessage } } = await this.ApiRef.put(`/meetings/${id}/status-is-on-or-off`, {
      isOn
    })
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
  async getMeetingsByPagination({ limit = 1, page = 1, textContains = '' }): Promise<Response> {
    const { data: { meetingsByPagination, errorMessage } } = await this.ApiRef.get(`/meetings/list-of-meetings-by-pagination?limit=${limit}&page=${page}&textContains=${textContains}`)
    return {
      data: { meetingsByPagination },
      errorMessage,
    }
  }
  async getNextMeetingsInFuture(userId: number): Promise<Response> {
    const { data: { nextMeetings, errorMessage, role } } = await this.ApiRef.get(`/meetings/next-meetings-of/${userId}`)
    return {
      data: { nextMeetings, role },
      errorMessage
    }
  }
  async getNumberOfMeetingsToday(): Promise<Response> {
    const { data: { numberOfMeetingsToday, errorMessage } } = await this.ApiRef.get(`/meetings/analysis/number-of-meetings-today`)
    return {
      data: { numberOfMeetingsToday },
      errorMessage
    }
  }
  async getNumberOfLastMessagesIsNotSeenByAuth(): Promise<Response> {
    const { data: { numberOfLastMessagesIsNotSeenByAuth, errorMessage } } = await this.ApiRef.get(`/messages/number-of-last-messages-is-not-seen-by-auth`)
    return {
      data: { numberOfLastMessagesIsNotSeenByAuth },
      errorMessage
    }
  }

  //////////COMMENT
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

  //////////MEETING_FILE_UPLOAD
  async setMeetingUploadFileNew(snapshot: object): Promise<Response> {
    // @ts-ignore
    const { data: { errorMessage } } = await this.ApiRef.post(`/meeting-file-uploads`, {
      meetingFileUpload: snapshot
    })
    return {
      errorMessage,
    }
  }
  async setMeetingFileUploadDelete(fileId: number): Promise<Response> {
    // @ts-ignore
    const { data: { errorMessage } } = await this.ApiRef.delete(`/meeting-file-uploads/${fileId}`)
    return {
      errorMessage,
    }
  }
}
