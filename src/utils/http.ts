import axios from 'axios'
//axios.defaults.withCredentials = true
//axios.defaults.crossDomain=true
export const http = axios.create({
  baseURL: 'http://localhost:8081',
  timeout: 10000,
  //withCredentials: true,
  headers: {}
})





