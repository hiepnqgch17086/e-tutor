export const LANDING_PAGE = '/'
export const SIGN_IN_PAGE = '/signin'
export const ACCOUNT_PAGE = '/account'
export const HOME_PAGE = '/home'
export const ADMIN_PAGE = '/admin'
export const PROFILE_PAGE = '/profile'


export const getIsAuthorized = () => {
  const token = localStorage.getItem('token')
  return token ? true : false
}

export const setLocalStorageAuthToken = (authString: string) => {
  localStorage.setItem('token', authString)
}

export const getLocalStorageAuthToken = (): Object => {
  const currentUserString = localStorage.getItem('token') || '{}'
  const currentUserObject = JSON.parse(currentUserString)
  return currentUserObject
}
