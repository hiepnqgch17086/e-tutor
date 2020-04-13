export const ACCOUNT_PAGE = '/account'
export const ADMIN_PAGE = '/admin'
export const ADMIN_ERROR_PAGE = '/admin-error'

// export const LANDING_PAGE = '/'
export const SIGN_IN_PAGE = '/signin'
export const HOME_PAGE = '/'
export const PROFILE_PAGE = '/profile'
export const QUOTE_SEPERATED = '/'

export const CHAT_ROOM_TUTOR_PAGE = '/chat-rooms-of-tutor'
export const CHAT_ROOM_STUDENT_PAGE = '/chat-room-of-student'
export const CALENDER_PAGE = '/calender'
export const MEETING_LIST_PAGE = '/meetings'
export const MEETING_DETAIL_PAGE = '/meetings/:id'
export const EMAIL_LIST_PAGE = '/emails'
export const EMAIL_DETAIL_PAGE = '/emails/:id'

export const STUDENT_LIST_PAGE = '/students'
export const STUDENT_DETAIL_PAGE = '/students/:id'
export const TUTOR_LIST_PAGE = '/tutors'
export const TUTOR_DETAIL_PAGE = '/tutors/:id'

export const get_STUDENT_PAGE = (id: string | number) => `/students/${id}`
export const get_TUTOR_PAGE = (id: string | number) => `/tutors/${id}`
export const get_CLASS_PAGE = (id: string | number) => `${CHAT_ROOM_TUTOR_PAGE}/${id}`
export const get_MEETING_DETAIL_PAGE = (id: string | number) => `${MEETING_LIST_PAGE}/${id}`
export const get_EMAIL_DETAIL_PAGE = (id: string | number) => `${EMAIL_LIST_PAGE}/${id}`
// export const getIsUserPagePath = (pathName: string) => {
//   const regex = new RegExp("^\\" + USER_LIST_PAGE + "\/\\w+$")
//   return regex.test(pathName)
// }

export const getIsClassPagePath = (pathName: string) => {
  const regex = new RegExp("^\\" + CHAT_ROOM_TUTOR_PAGE + "\\w+$")
  return regex.test(pathName)
}

export const getIsAuthorized = () => {
  const token = localStorage.getItem('token')
  return token ? true : false
}

export const setLocalStorageAuthIdToken = (token: string) => {
  localStorage.setItem('token', token)
}

export const setLocalStorageAuthTokenDelete = () => {
  localStorage.removeItem('token')
}

export const getLocalStorageToken = (): string => {
  try {
    const token = localStorage.getItem('token') || ''
    return token
  } catch (error) {
    return ''
  }
}

export const goStudentPage = (userId: any) => {
  window.open(get_STUDENT_PAGE(`${userId}`))
}

export const goTutorPage = (tutorId: any) => {
  window.open(get_TUTOR_PAGE(`${tutorId}`))
}

export const goMeetingPage = (meetingId: any) => {
  window.open(get_MEETING_DETAIL_PAGE(`${meetingId}`))
}
