import axios from 'axios'
const baseUrl = '/service'

// eslint-disable-next-line no-unused-vars

const getAll = async () => {
    const request = axios.get(`${baseUrl}/cities`)
    return request.then(response => response.data)
  }

const getWeather = async (lat, lon) => {
  const params = new URLSearchParams({lat: lat, lon: lon})
  const request = axios.get(`${baseUrl}/weather?` + params)
  return request.then(response => response.data)
}

  const exportedObject = {getAll, getWeather};
  export default exportedObject