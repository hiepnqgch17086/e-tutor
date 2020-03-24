export const ACCOUNT_PAGE = '/account'
export const ADMIN_PAGE = '/admin'
export const ADMIN_ERROR_PAGE = '/admin-error'
export const ALL_USERS_PAGE = '/all-users'
export const CLASS_LIST_PAGE = '/classes'
export const CLASS_FORM_PAGE = '/class-form'
export const LANDING_PAGE = '/'
export const SIGN_IN_PAGE = '/signin'
export const HOME_PAGE = '/home'
export const PROFILE_PAGE = '/profile'
export const PROFILE_EDIT_PAGE = '/profile-edit'


export const getIsAuthorized = () => {
  const token = localStorage.getItem('token')
  return token ? true : false
}

export const setLocalStorageAuthToken = (authString: string) => {
  localStorage.setItem('token', authString)
}

export const setLocalStorageAuthTokenDelete = () => {
  localStorage.removeItem('token')
}

export const getLocalStorageAuthToken = (): Object => {
  const currentUserString = localStorage.getItem('token') || '{}'
  const currentUserObject = JSON.parse(currentUserString)
  return currentUserObject
}
