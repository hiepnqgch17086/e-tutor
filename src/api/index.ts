// import JsonApi from './jsonApi'
import MainApi from './mainApi'

// const JsonApiInstance = new JsonApi()

const MainApiInstance = new MainApi()

const API = MainApiInstance

API.isMainApi = API === MainApiInstance

export default API
