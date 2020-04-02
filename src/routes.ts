export const ACCOUNT_PAGE = '/account'
export const ADMIN_PAGE = '/admin'
export const ADMIN_ERROR_PAGE = '/admin-error'

export const LANDING_PAGE = '/'
export const SIGN_IN_PAGE = '/signin'
export const HOME_PAGE = '/home'
export const PROFILE_PAGE = '/profile'
export const QUOTE_SEPERATED = '/'

export const CHAT_PAGE = '/chat'
export const CALENDER_PAGE = '/calender'
export const MEETING_LIST_PAGE = '/meetings'
export const MEETING_DETAIL_PAGE = '/meetings/:id'
export const EMAIL_LIST_PAGE = '/emails'
export const EMAIL_DETAIL_PAGE = '/emails/:id'
// export const get_USER_PAGE = (id: string | number) => `${USER_LIST_PAGE}/${id}`
export const get_CLASS_PAGE = (id: string | number) => `${CHAT_PAGE}/${id}`
export const get_MEETING_DETAIL_PAGE = (id: string | number) => `${MEETING_LIST_PAGE}/${id}`
export const get_NOTIFICATION_DETAIL_PAGE = (id: string | number) => `${EMAIL_LIST_PAGE}/${id}`
// export const getIsUserPagePath = (pathName: string) => {
//   const regex = new RegExp("^\\" + USER_LIST_PAGE + "\/\\w+$")
//   return regex.test(pathName)
// }

export const getIsClassPagePath = (pathName: string) => {
  const regex = new RegExp("^\\" + CHAT_PAGE + "\\w+$")
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

export const getLocalStorageToken = (): string | number => {
  try {
    const token = localStorage.getItem('token') || ''
    return token
  } catch (error) {
    return ''
  }
}

// export const goUserPage = (userId: any) => {
//   window.open(get_USER_PAGE(userId))
// }
