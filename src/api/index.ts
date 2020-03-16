import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:3001'
})

API.interceptors.request.use(
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

export default API
