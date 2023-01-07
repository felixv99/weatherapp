import axios from 'axios'
const baseUrl = '/service/favorites'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
  }

const addFavorite = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
  
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }

  const getFavorites = async (username) => {
    const request = axios.get(`${baseUrl}/${username}`)
    return request.then(response => response.data)
  }

  const deleteFavorite = async (username, cityId) => {
    const config = {
        headers: { Authorization: token },
      }
      const response = await axios.put(`${baseUrl}/${username}/${cityId}`,{}, config)
      return response.data
  }

const exportedObject = {addFavorite, setToken, getFavorites, deleteFavorite};
export default exportedObject