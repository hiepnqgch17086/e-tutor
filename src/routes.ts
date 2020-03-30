export const ACCOUNT_PAGE = '/account'
export const ADMIN_PAGE = '/admin'
export const ADMIN_ERROR_PAGE = '/admin-error'
export const CLASS_LIST_PAGE = '/classes'
export const CLASS_ADD_PAGE = '/class-add'
export const CLASS_DETAIL_PAGE = '/classes/:id'
export const LANDING_PAGE = '/'
export const SIGN_IN_PAGE = '/signin'
export const HOME_PAGE = '/home'
export const PROFILE_PAGE = '/profile'
export const PROFILE_EDIT_PAGE = '/profile-edit'
export const QUOTE_SEPERATED = '/'
export const USER_LIST_PAGE = `/users`
export const USER_ADD_PAGE = '/user-add'
export const USER_PAGE = `/users/:id`
export const get_USER_PAGE = (id: string | number) => `${USER_LIST_PAGE}/${id}`
export const get_CLASS_PAGE = (id: string | number) => `${CLASS_LIST_PAGE}/${id}`

export const getIsUserPagePath = (pathName: string) => {
  const regex = new RegExp("^\\" + USER_LIST_PAGE + "\/\\w+$")
  return regex.test(pathName)
}

export const getIsClassPagePath = (pathName: string) => {
  const regex = new RegExp("^\\" + CLASS_LIST_PAGE + "\/\\w+$")
  return regex.test(pathName)
}

export const getIsAuthorized = () => {
  const token = localStorage.getItem('token')
  return token ? true : false
}

export const setLocalStorageAuthIdToken = (authId: string) => {
  localStorage.setItem('token', authId)
}

export const setLocalStorageAuthTokenDelete = () => {
  localStorage.removeItem('token')
}

export const getLocalStorageAuthIdToken = (): string | number => {
  try {
    const authIdString = localStorage.getItem('token') || ''
    const authId = JSON.parse(authIdString)
    return authId
  } catch (error) {
    return ''
  }
}

export const goUserPage = (userId: any) => {
  window.open(get_USER_PAGE(userId))
}

if (('indexedDB' in window)) {
  console.log('THis browser...');
} 
