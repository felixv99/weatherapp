import axios from 'axios'
const baseUrl = '/service'

const login = async credentials => {
  const response = await axios.post(`${baseUrl}/login`, credentials)
  return response.data
}
/* eslint-disable import/no-anonymous-default-export */

const signUp = async credentials => {
  const response = await axios.post(`${baseUrl}/register`, credentials)
  return response.data
}
export default { login, signUp }